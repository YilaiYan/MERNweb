const  express = require('express');
const router = express.Router();

//@route  GET api/users
//@desc   Test route
//@access Public (public route don't need token)
router.get('/', (req, res) => res.send('User route'));

module.exports = router;