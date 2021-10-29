const router = require("express").Router();
const validateSession = require("../middleware/validate-session");
const  { RecipeModel } = require("../models");

router.get('/recipes', async (req, res) => {
    try {
        const entries = await RecipeModel.findAll();
        res.status(200).json(entries);
    } catch (err) {
        res.status(500).json({error: err})
    }
    })

router.post('/recipes' , validateSession, function (req, res) {
    
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

/*Update Recipe*/
router.put("/update/:recipeId", validateSession, async (req, res) => {
    const { nameOfDessert, recipe, directions, timeToBake, servings,photo} = req.body.recipes;
    const recipesId = req.params.recipeId;
    const userId = req.user.id;

    const query = {
        where: {
            id: recipesId,
            owner: userId
        }
    };

    const updatedRecipe = {
        nameOfDessert: nameOfDessert,
        recipe: recipe,
        directions: directions,
        timeToBake: timeToBake,
        servings: servings,
        photo: photo
    };

    try {
        const update = await RecipeModel.update(updatedRecipe, query);
        res.status(200).json(update);
        
    } catch (err) {
        res.status(500).json({error: err})
    }
})

/*Delete */
router.delete("/delete/:id", validateSession, async (req, res) => {
    const ownerId = req.user.id;
    const recipeId = req.params.id;
    
  
    try{
      const query = {
        where: {
          id: recipeId,
          owner: ownerId
        }
      };
      await RecipeModel.destroy(query);
      res.status(200).json({message: "Recipe deleted"});
    } catch (err) {
      res.status(500).json({ error: err })
    }
  })


module.exports = router;