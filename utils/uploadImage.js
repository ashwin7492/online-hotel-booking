const { uploadToCloudinary } = require("./cloudinaryService");
const ExpressError = require("./ExpressError");

const uploadImage = async (req, res, next) => {
  try {
    // file check
    if (!req.file) {
      throw new ExpressError(400, "Image is required");
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
