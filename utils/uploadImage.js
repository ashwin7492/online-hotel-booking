const { uploadToCloudinary } = require("./cloudinaryService");
const ExpressError = require("./ExpressError");

const uploadImage = async (req, res, next) => {
  try {
    // file check
    if (!req.file) {
      if (req.method === "POST") {
        throw new ExpressError(400, "Image is required");
      }
      return next(); // If it's a PATCH request and no file is provided, just continue without error
    }

    // upload to cloudinary (buffer se)
    const imageData = await uploadToCloudinary(req.file.buffer);
    console.log("Cloudinary result:", imageData);

    // attach to request
    req.image = imageData;

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = uploadImage;
