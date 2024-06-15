const User = require('../models/User');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');



//Register User
exports.register = async (req, res) => {

    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                mes: 'User already exists'
            })
        }

        user = new User({ name, email, password });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        // on the payload time 
        //
        const payload = {
            user: {
                id: user.id,
            }
        };
        // we can use expity with this method also 
        JWT.sign(payload, process.env.SECRET_TOKEN, { expiresIn: '24h' }, (err, asyncToken) => {
            if (err) throw err;
            res.json({ asyncToken })
        });

    } catch (error) {
        console.log(error?.message);
        //500 code for server error
        res.status(500).send('Server Error')
    }
}



//Login User
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                mes: 'Invalid Credntial. '
            })
        }
        const passMatch = await bcrypt.compare(password, user.password);
        if (!passMatch) {
            return res.status(400).json({
                mes: 'Invalid Credntials. ' //on purpose 
            })
        }
        const payload = {
            user: {
                id: user.id,
            }
        };
        JWT.sign(payload, process.env.SECRET_TOKEN, { expiresIn: '24h' }, (err, asyncToken) => {
            if (err) throw err;
            res.json({ asyncToken })
        });
    } catch (error) {
        console.log(error?.message);
        //500 code for server error
        res.status(500).send('Server Error')
    }
}



//final user get
exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};