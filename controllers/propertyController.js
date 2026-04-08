import Property from "../models/Property.js";
import cloudinary from "../config/cloudinary.js";

// Get all properties with filters
export const getAllProperties = async (req, res) => {
    try {
        const {
            type,
            city,
            minPrice,
            maxPrice,
            bedrooms,
            status,
            search,
            page = 1,
            limit = 10,
        } = req.query;

        // Filter object banao
        const filter = {};

        if (type) filter.type = type;
        if (city) filter["location.city"] = { $regex: city, $options: "i" };
        if (status) filter.status = status;
        if (bedrooms) filter["features.bedrooms"] = Number(bedrooms);
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }
        if (search) {
            filter.$text = { $search: search };
        }

        // Pagination
        const skip = (Number(page) - 1) * Number(limit);
        const total = await Property.countDocuments(filter);

        const properties = await Property.find(filter)
            .populate("postedBy", "name email phone")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(Number(limit));

        res.status(200).json({
            success: true,
            total,
            page: Number(page),
            pages: Math.ceil(total / Number(limit)),
            data: properties,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};




// @desc    Get single property
// @route   GET /api/properties/:id
// @access  Public
export const getSingleProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id).populate(
            "postedBy",
            "name email phone"
        );

        if (!property) {
            return res.status(404).json({
                success: false,
                message: "Property not found",
            });
        }

        if (!req.query.admin) {
            property.views += 1;
            await property.save();
        }


        res.status(200).json({
            success: true,
            data: property,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};




// @desc    Create property
// @route   POST /api/properties
// @access  Private (Admin)
export const createProperty = async (req, res) => {
    try {
        const {
            title,
            description,
            type,
            price,
            address,
            city,
            province,
            size,
            unit,
            bedrooms,
            bathrooms,
            parking,
            furnished,
        } = req.body;

        // Images Cloudinary se aa rahi hain
        const images = req.files ? req.files.map((file) => (
            { url: file.path, public_id: file.filename }
        )) : [];

        const property = await Property.create({
            title,
            description,
            type,
            price,
            location: {
                address,
                city,
                province,
            },
            area: {
                size,
                unit,
            },
            features: {
                bedrooms,
                bathrooms,
                parking: parking === "true",
                furnished: furnished === "true",
            },
            images,
            postedBy: req.user._id,
        });

        res.status(201).json({
            success: true,
            message: "Property created successfully",
            data: property,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};



// @desc    Update property
// @route   PUT /api/properties/:id
// @access  Private (Admin)
export const updateProperty = async (req, res) => {
    try {

        const property = await Property.findById(req.params.id);

        if (!property) {
            return res.status(404).json({
                success: false,
                message: "Property not found",
            });
        }

        if (property.postedBy.toString() !== req.user._id.toString() &&
            req.user.role !== "admin"
        ) {
            return res.status(403).json({
                success: false,
                message: "Not authorized to update this property",
            });
        }

        // Images handle 
        let images = property.images;

        if (req.files && req.files.length > 0) {
            // New images uploaded on cloudnary
            const newImages = req.files.map((file) => ({
                url: file.path,
                public_id: file.filename,
            }));

            // Existing images
            const existingImages = req.body.existingImages
                ? JSON.parse(req.body.existingImages)
                : [];

            images = [...existingImages, ...newImages];
        } else if (req.body.images) {
            // only existing images update
            images = req.body.images;
        }

        const updatedProperty = await Property.findByIdAndUpdate(
            req.params.id,
            {
                ...req.body,
                images,
                // Nested objects properly updated
                ...(req.body.location && { location: req.body.location }),
                ...(req.body.area && { area: req.body.area }),
                ...(req.body.features && { features: req.body.features }),
            },
            { returnDocument: "after", runValidators: true }
        );

        res.status(200).json({
            success: true,
            message: "Property updated successfully",
            data: updatedProperty,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};




// @desc    Delete property
// @route   DELETE /api/properties/:id
// @access  Private (Admin)
export const deleteProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);

        if (!property) {
            return res.status(404).json({
                success: false,
                message: "Property not found",
            });
        }

        if ( property.postedBy.toString() !== req.user._id.toString() &&
            req.user.role !== "admin"
        ) {
            return res.status(403).json({
                success: false,
                message: "Not authorized to delete this property",
            });
        }

        // Cloudinary se images delete karo
        // import cloudinary from "../config/cloudinary.js";
        for (const image of property.images) {
            await cloudinary.uploader.destroy(image.public_id);
        }

        await property.deleteOne();

        res.status(200).json({
            success: true,
            message: "Property deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};




// @desc    Add to wishlist
// @route   PUT /api/properties/:id/wishlist
// @access  Private
export const toggleWishlist = async (req, res) => {
    try {
        const user = req.user;
        const propertyId = req.params.id;

        const isInWishlist = user.wishlist.includes(propertyId);

        if (isInWishlist) {
            // Remove from wishlist
            user.wishlist = user.wishlist.filter(
                (id) => id.toString() !== propertyId
            );
        } else {
            // Add to wishlist
            user.wishlist.push(propertyId);
        }

        await user.save();

        res.status(200).json({
            success: true,
            message: isInWishlist ? "Removed from wishlist" : "Added to wishlist",
            wishlist: user.wishlist,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};