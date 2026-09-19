const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const dbUrl = process.env.ATLAS_DBURL;

main()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
  });
async function main() {
  await mongoose.connect(url);
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "69cabfe854bc3278317217ef",
  }));
  await Listing.insertMany(initData.data);
  console.log("Database Initialized with sample data");
};

initDB();
