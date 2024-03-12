const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Mulank = require("../model/mulankModel");
const Numeroscope = require("../model/numeroscopeModel");
const Rajyog = require("../model/rajyogModel");
const Combination = require("../model/combinationModel");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB connection successful!"));

// In Node.js, __dirname is a special variable that represents the directory name of the current module.
const mulank = JSON.parse(fs.readFileSync(`${__dirname}/mulank.json`, "utf-8"));
const numeroscope = JSON.parse(
  fs.readFileSync(`${__dirname}/numeroscope.json`, "utf-8")
);

const rajyog = JSON.parse(fs.readFileSync(`${__dirname}/rajyog.json`, "utf-8"));

const combination = JSON.parse(
  fs.readFileSync(`${__dirname}/combination.json`, "utf-8")
);

const importData = async () => {
  try {
    await Mulank.create(mulank);
    await Numeroscope.create(numeroscope);
    await Rajyog.create(rajyog);
    await Combination.create(combination);
    console.log("Data successfully loaded!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Mulank.deleteMany();
    await Numeroscope.deleteMany();
    await Rajyog.deleteMany();
    // await combination.deleteMany();
    console.log("Data successfully deleted!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  //node dev-data/upload.js --import
  importData();
} else if (process.argv[2] === "--delete") {
  //node dev-data/upload.js --delete
  deleteData();
}
