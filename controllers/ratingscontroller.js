const router = require("express").Router();
const validateSession = require("../middleware/validate-session");
const validateJWT = require("../middleware/validate-session")
const { RatingsModel } = require("../models");

router.get('/practice', validateJWT, (req, res) => {
    res.send('Hey this is rating')
});

router.post('/create', validateSession, async (req, res) => {
    const {ratingOfDessert, feedback, recipeId} = req.body.ratings;

    try {
        await RatingsModel.create({
            ratingOfDessert: req.body.ratingOfDessert,
            feedback : req.body.feedback,
            recipeId: req.body.recipeId,
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

router.get('/get', validateSession, function (req, res) {
    const ratingEntry = {
        where: {
            userId: req.body.user,
            include: "user"
        }
    };
     RatingsModel.findAll(ratingEntry) 
    .then((rating) => res.status(200).json(rating))
    .catch((err) => res.status(500).json({error: err}))
    
})

module.exports = router;