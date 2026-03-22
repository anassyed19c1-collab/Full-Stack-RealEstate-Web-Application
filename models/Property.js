import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    type: {
      type: String,
      enum: ["buy", "sell", "rent", "commercial", "plot"],
      required: [true, "Property type is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    location: {
      address: {
        type: String,
        required: [true, "Address is required"],
        trim: true,
      },
      city: {
        type: String,
        required: [true, "City is required"],
        trim: true,
      },
      province: {
        type: String,
        required: [true, "Province is required"],
        trim: true,
      },
    },
    area: {
      size: {
        type: Number,
        required: [true, "Area size is required"],
      },
      unit: {
        type: String,
        enum: ["marla", "kanal", "sqft", "sqm"],
        default: "marla",
      },
    },
    features: {
      bedrooms: {
        type: Number,
        default: 0,
      },
      bathrooms: {
        type: Number,
        default: 0,
      },
      parking: {
        type: Boolean,
        default: false,
      },
      furnished: {
        type: Boolean,
        default: false,
      },
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        public_id: {
          type: String,
          required: true,
        },
      },
    ],
    status: {
      type: String,
      enum: ["active", "sold", "rented"],
      default: "active",
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Search ke liye index
propertySchema.index({ title: "text", description: "text" });
propertySchema.index({ "location.city": 1 });
propertySchema.index({ type: 1 });
propertySchema.index({ price: 1 });

const Property = mongoose.model("Property", propertySchema);

export default Property;