import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);


export const sendContactEmail = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    // Send Email
    const { data, error } = await resend.emails.send({
      from: "EstatePro <onboarding@resend.dev>",
      to: ["anas.syed19c1@gmail.com"], // ← apna email likho yahan
      subject: `New Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="background: #000; color: #fff; padding: 20px; margin: 0;">
            EstatePro — New Contact Message
          </h2>
          
          <div style="padding: 24px; background: #f9f9f9;">
            <table style="width: 100%;">
              <tr>
                <td style="padding: 8px 0; color: #666; width: 120px;">Name:</td>
                <td style="padding: 8px 0; font-weight: bold;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;">Email:</td>
                <td style="padding: 8px 0; font-weight: bold;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;">Phone:</td>
                <td style="padding: 8px 0; font-weight: bold;">${phone || "Not provided"}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #666;">Subject:</td>
                <td style="padding: 8px 0; font-weight: bold;">${subject}</td>
              </tr>
            </table>

            <div style="margin-top: 16px; padding: 16px; background: #fff; border-left: 4px solid #000; border-radius: 4px;">
              <p style="color: #666; margin: 0 0 8px;">Message:</p>
              <p style="margin: 0; line-height: 1.6;">${message}</p>
            </div>
          </div>

          <div style="padding: 16px 24px; background: #000; color: #666; font-size: 12px; text-align: center;">
            © ${new Date().getFullYear()} EstatePro. All rights reserved.
          </div>
        </div>
      `,
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    res.status(200).json({
      success: true,
      message: "Email sent successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};