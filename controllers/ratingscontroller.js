const router = require("express").Router();
const validateJWT = require("../middleware/validate-session")
const { RatingsModel } = require("../models");

router.get('/practice', validateJWT, (req, res) => {
    res.send('Hey this is practice')
});

module.exports = router;