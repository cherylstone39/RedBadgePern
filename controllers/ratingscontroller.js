const router = require("express").Router();
const validateJWT = require("../middleware/validate-session")
const { RatingsModel } = require("../models");

// router.get('/practice', validateJWT, (req, res) => {
//     res.send('Hey this is practice')
// });

router.post('/ratings', async (req, res) => {
    const {ratingOfDessert, feedback, recipeId} = req.body.ratings;

    try {
        await models.RatingsModel.create({
            ratingOfDessert: ratingOfDessert,
            feedback : feedback,
            recipeId: recipeId,
            userId: req.user.id
        })
        .then( ratings => {
            res.status(201).json({
                ratings: ratings,
                message: 'recipe rated'
            })
        })
    } catch (err) {
        res.status(500).json({
            error: `Failed to create rating: ${err}`
        })
    }
})

module.exports = router;