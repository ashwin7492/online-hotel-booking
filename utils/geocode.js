const axios = require("axios");
const geocodeLocation = async (req, res, next) => {
  try {
    const { location, country } = req.body.listing;

    console.log("Location:", location);
    console.log("Country:", country);

    const response = await axios.get(
      "https://api.geoapify.com/v1/geocode/search",
      {
        params: {
          text: location,
          format: "json",
          limit: 1,
          apiKey: process.env.MAP_TOKEN,
        },
      },
    );

    console.log("Geoapify response:", response.data);

    if (!response.data.results || response.data.results.length === 0) {
      req.flash("error", `Location "${location}" could not be found.`);
      return res.redirect("/listings/new");
    }

    const result = response.data.results[0];

    req.body.listing.latitude = result.lat;
    req.body.listing.longitude = result.lon;

    next();
  } catch (err) {
    console.log("========== GEOCODING ERROR ==========");
    console.log("Message:", err.message);
    console.log("Status:", err.response?.status);
    console.log("Response:", err.response?.data);
    console.log("=====================================");

    req.flash("error", "Unable to find location.");
    return res.redirect("/listings/new");
  }
};
module.exports = geocodeLocation;
