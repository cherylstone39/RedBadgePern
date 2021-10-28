const router = require("express").Router();
const validateJWT = require("../middleware/validate-session");
const  { RecipeModel } = require("../models");

router.get('/practice', validateJWT, (req, res) => {
    res.send('Hey this is a practice route!')
})


module.exports = router;