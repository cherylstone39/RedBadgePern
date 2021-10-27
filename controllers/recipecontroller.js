const Express = require('express');
const router = Express.Router();

router.get('/practice', (req, res) => {
    res.send('Hey this is a practice route!')
})

router.post('/create', validateJWT, async (req, res) =>{
    const { nameOfDessert, recipe, directions, timeToBake, servings, photo} = req.body.recipe;
    const { id } = req.user;
    const recipeEntry = {
        nameOfDessert,
        recipe,
        directions,
        timeToBake,
        servings,
        photo,
        owner: id 
    }
    try {
        const newRecipe = await RecipeModel.create(recipeEntry);
        res.status(200).json(newRecipe);
    } catch (err) {
        res.status(500).json({ error: err });
    }
    // RecipeModel.create(recipeEntry)

});

module.exports = router;