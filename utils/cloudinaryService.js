const cloudinary = require("../utils/cloudinary");

const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    if (!fileBuffer) {
      return reject(new Error("File buffer is missing"));
    }

    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "airbnb-clone",
        resource_type: "image", // explicitly define
      },
      (error, result) => {
        if (error) return reject(error);

        resolve({
          url: result.secure_url,
          filename: result.public_id,
        });
      },
    );

    stream.end(fileBuffer);
  });
};

module.exports = { uploadToCloudinary };
