const { DataTypes } = require("sequelize");
const db = require("../db");
// Example UserTable Build this out Need more columns add it here
const Recipe = db.define("recipe", {
  nameOfDessert: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  recipe: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  directions: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  timeToBake: {
    type: DataTypes.STRING, //number as well
    allowNull: false,
  },
  servings: {
      type: DataTypes.INTEGER,
      allowNull: false,
  },
  photo: {
      type: DataTypes.STRING,
      allowNull: false,
  },

});

module.exports = Recipe;