const Express = require('express');
const router = Express.Router();

router.get('/practice', (req, res) => {
    res.send('Hey this is practice')
});

module.exports = router;