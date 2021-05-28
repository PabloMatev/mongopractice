const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDb = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log("MongoDB Connected ");
  } catch (err) {
    console.log("this is the error >>>");
    console.error(err.message);
    console.log("this is the error ^^^");
    process.exit(1);
  }
};

module.exports = connectDb;
