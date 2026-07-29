const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../schema.js");
const multer = require("multer");
const upload = require("../utils/multer.js");
const { isLogin, isOwner, validateListing } = require("../utils/middleware.js");
const uploadImage = require("../utils/uploadImage.js");

const listingController = require("../controller/listing.js");

// Index route, Create route
router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLogin,
    upload.single("listing[image]"),
    uploadImage,
    validateListing,
    wrapAsync(listingController.createListing),
  );

// .post((req,res)=> {
//     res.send(req.file);
//     console.log(req.file);
// })
// .post(upload.single('listing[image]'),uploadImage, (req,res)=>{
//     res.send(req.file);
//     console.log(req.file);
// })
// New route
router.route("/new").get(isLogin, wrapAsync(listingController.renderNewForm));

// Show route, Update route, Delete route
router
  .route("/:id")
  .get(wrapAsync(listingController.showListings))
  .patch(
    isLogin,
    isOwner,
    validateListing,
    wrapAsync(listingController.updateListing),
  )
  .delete(isLogin, isOwner, wrapAsync(listingController.destroyListing));

// Edit route
router
  .route("/:id/edit")
  .get(isLogin, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;
