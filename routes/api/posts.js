const  express = require('express');
const router = express.Router();

//@route  GET api/posts
//@desc   Test route
//@access Public (public route don't need token)
router.get('/', (req, res) => res.send('Posts route'));

module.exports = router;