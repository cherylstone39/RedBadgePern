const { DataTypes } = require("sequelize");
const db = require("../db");
// Example UserTable Build this out Need more columns add it here
const Ratings = db.define("ratings", {
  ratingOfDessert: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  feedback: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  

});

module.exports = Ratings;