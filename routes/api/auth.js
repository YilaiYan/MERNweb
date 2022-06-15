const  express = require('express');
const { selectFields } = require('express-validator/src/select-fields');
const router = express.Router();
const auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator');

const User = require('../../models/User');

//@route  GET api/auth
//@desc   Authenticate user 
//@access Public (public route don't need token)
router.get('/', auth, async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

//@route  POST api/auth
//@desc   Authenticate user & get token
//@access Public (public route don't need token)
router.post(
    '/', 
    [
    check('email', 'Please include a valid email!').isEmail(),
    check('password', 'Password is required').exists()
    ], 
    async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;

    try{
    //See if user exists
        let user = await User.findOne({email: email});
        if(!user) {
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }]});
        }

        
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }]});
        }
        //it's a good idea to keep the two invalid message same 
        //because if it says the user in not exist or password incorrect, it could be a security risk.

        const payload = {
            user: {
                id: user.id
            }
        }
    //Return jsonwebtoken
        jwt.sign(
            payload, 
            config.get('jwtSecret'),
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            
            });
    
    

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
    

    
});

module.exports = router;