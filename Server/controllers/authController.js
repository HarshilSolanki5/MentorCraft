const User = require('../models/user')
const {hashPassword, comparePassword} = require('../helpers/auth')
const jwt = require('jsonwebtoken')


const test = ( req, res ) => {
    res.json('Test is working')
}
let c;
const registerUser = async (req,res)=>{
    try {
        const {name, email, password}  = req.body;
        if(!name){
            return res.json({
                error: 'name is required'
            });
        }
        if(!password || password.length < 6){
            return res.json({
                error: 'Password is required and should be at least 6 characters long'
            });
        }
        const exist = await User.findOne({email});
        if(exist){
            return res.json({
                error: 'Email is taken already'
            });
        }

        const hashedPassword = await hashPassword(password)
        jwt.sign({email: email, name: name }, process.env.JWT_SECRET, {}, (err, token) => {
           c=res.cookie('tokens', token).json(user)
    })

        console.log(c);
        const user = await User.create({
            name, 
            email, 
            password: hashedPassword,
            // seTtokens:req.cookie.token
        });


        return res.json(user);
    } catch (error) {
        console.log(error);
    }
};

const loginUser  = async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.json({
                error: 'No user found'
            })
        }
        const match = await comparePassword(password, user.password)
        if(match){
            jwt.sign({email: user.email, id: user.id, name: user.name }, process.env.JWT_SECRET, {}, (err, token) => {
                res.cookie('token', token).json(user)
            })
        }
        if(!match){
            res.json ({
                error: "Password do not match"
            })
        }

    }
    catch(error){
        console.log(error)
    }
}

const getProfile = (req, res) => {
const {token} = req.cookies
if(token){
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
        if(err) throw err;
        res.json(user)
    })
} else {
    res.json(null)
}
}

module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile
}