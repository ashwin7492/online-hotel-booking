const Listing = require("../models/listing");

module.exports.index = async (req, res) => {
  try {
    let listings = await Listing.find({});
    res.render("listing/index.ejs", { listings });
  } catch (err) {
    console.log(err);
  }
};

module.exports.renderNewForm = async (req, res) => {
  res.render("listing/new.ejs");
};

module.exports.createListing = async (req, res) => {
  try {
    let listing = new Listing(req.body.listing);
    listing.owner = req.user._id;
    if (req.image) {
      listing.image = req.image;
    }
    console.log(listing);
    await listing.save();
    req.flash("success", "New Listing created successfully");
    res.redirect("/listings");
  } catch (err) {
    console.log(err);
    req.flash("error", err.message);
    res.redirect("/listings/new");
  }
};

module.exports.showListings = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing not found");
    return res.redirect("/listings");
  }
  console.log(listing);
  res.render("listing/show.ejs", { listing });
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing not found for editing");
    return res.redirect("/listings");
  }

  res.render("listing/edit.ejs", { listing });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, req.body.listing, {
    new: true,
    runValidators: true,
  });
  if (typeof req.image === "object" && req.image !== null) {
    listing.image = req.image;
    await listing.save();
  }
  req.flash("success", "Listing updated successfully");
  console.log("list updated");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  console.log("Deleted");
  req.flash("success", "Listing deleted successfully");
  res.redirect("/listings");
};
