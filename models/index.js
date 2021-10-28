const User = require("./user");
// create individual files for your models and import them here
const RecipeModel = require("./recipe");
const RatingsModel = require("./ratings")

// Setup Associations

User.hasMany(RecipeModel);
User.hasMany(RatingsModel);

RecipeModel.belongsTo(User);
RecipeModel.hasMany(RatingsModel);

RatingsModel.belongsTo(RecipeModel);

module.exports = {
  User,
  RecipeModel,
  RatingsModel
};
