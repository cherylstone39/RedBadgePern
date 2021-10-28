const router = require("express").Router();
const validateJWT = require("../middleware/validate-session");
const  { RecipeModel } = require("../models");

// router.get('/practice', validateJWT, (req, res) => {
//     res.send('Hey this is a practice route!')
// })

router.post('/recipes' , async (req, res) => {
    
    const {nameOfDessert, recipe, directions, timeToBake, servings, photo } = req.body.recipes;
    
    try{
        await models.RecipeModel.create({
            nameOfDessert: nameOfDessert,
            recipe : recipe,
            directions: directions,
            timeToBake: timeToBake,
            servings: servings,
            photo: photo,
            userId: req.user.id
        })
        .then( recipes => {
            res.status(201).json({
                recipes: recipes,
                message: 'recipe created'
            });
        }
        )
    } catch (err) {
        res.status(500).json({
            error: `Failed to create recipe: ${err}`
        });
    }
})


module.exports = router;