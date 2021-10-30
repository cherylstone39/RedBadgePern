const router = require("express").Router();
const validateSession = require("../middleware/validate-session");
const  { RecipeModel } = require("../models");

router.post('/post', async (req, res) => {
    res.send('this is a recipe test')
});

router.post('/create' , validateSession, function (req, res) {
    
    RecipeModel.create({
            nameOfDessert: req.body.recipes.nameOfDessert,
            recipe : req.body.recipes.recipe,
            directions: req.body.recipes.directions,
            timeToBake: req.body.recipes.timeToBake,
            servings: req.body.recipes.servings,
            photo: req.body.recipes.photo,
            userId: req.user.id
        })
        .then((recipe) => res.status(200).json(recipe))
        .catch((err)=> res.status(500).json({error: err}))
})

router.get('/get', validateSession, function (req, res) {
    const recipeCreated = {
        where: {
            userId: req.body.user,
            include: "user"
        }
    }
    Recipe.findAll(recipeCreated)
    .then((recipe) => res.status(200).json(recipe))
    .catch((err) => res.status(500).json({error: err}))
})

/*Update Recipe*/
// router.put("/update/:recipeId", validateSession, async (req, res) => {
//     const { nameOfDessert, recipe, directions, timeToBake, servings,photo} = req.body.recipes;
//     const recipesId = req.params.recipeId;
//     const userId = req.user.id;

//     const query = {
//         where: {
//             id: recipesId,
//             owner: userId
//         }
//     };

//     const updatedRecipe = {
//         nameOfDessert: nameOfDessert,
//         recipe: recipe,
//         directions: directions,
//         timeToBake: timeToBake,
//         servings: servings,
//         photo: photo
//     };

//     try {
//         const update = await RecipeModel.update(updatedRecipe, query);
//         res.status(200).json(update);
        
//     } catch (err) {
//         res.status(500).json({error: err})
//     }
// })

// /*Delete */
// router.delete("/delete/:id", validateSession, async (req, res) => {
//     const ownerId = user.id;
//     const recipesId = recipeId;
    
  
//     try{
//       const query = {
//         where: {
//           id: recipesId,
//           owner: ownerId
//         }
//       };
//       await RecipeModel.destroy(query);
//       res.status(200).json({message: "Recipe deleted"});
//     } catch (err) {
//       res.status(500).json({ error: err })
//     }
//   })


module.exports = router;