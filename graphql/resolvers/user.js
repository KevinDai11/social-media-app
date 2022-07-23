const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {validateRegisterInput, validateLoginInput} = require('../../util/validators');

const {UserInputError} = require('apollo-server');
const {SECRET_KEY} = require('../../config');

function generate_token(user) {
    return jwt.sign({id: user.id, email: user.email, username: user.username}, SECRET_KEY, {expiresIn: '1h'});
}


module.exports = {
    Mutation: { 
        async login(_, {username, password}, context, info) { //return mutation for login
            const {errors, valid} = validateLoginInput(username, password); //validate user input data for login

            if(!valid) {
                throw new UserInputError('Errors', {errors}); //throw error if user input data is invalid
            }
            const user = await User.findOne({username}); //check if username exists

            if (!user){
                errors.general = "User not found";
                throw new UserInputError('Username not found', {errors});
            }
            
            const passwordMatch = await bcrypt.compare(password, user.password); //check if password matches
            if (!passwordMatch){
                errors.general = "Wrong password";
                throw new UserInputError('Wrong password', {errors});
            }
            const token = generate_token(user); //create token

            return {
                ...user._doc,
                id: user._id,
                token,
            }
        },


        async register(_, {registerInput : {username, email, password, confirmPassword}}, context, info) {//returns the mutation for register
            //TODO: validate user data
            const {errors, valid} = validateRegisterInput(username, email, password, confirmPassword);
            if(!valid) {
                throw new UserInputError('Errors', {errors});
            }

            //TODO: make sure user doesn't already exist
            const user = await User.findOne({username});
            const user2 = await User.findOne({email});
            if (user2) {
                throw new UserInputError('Email is already has an account', {
                    errors: {
                        email: "This email is has an registered account"
                    }
                });
            }
            if(user) {
                throw new UserInputError('Username is taken', {
                    errors: {
                        username: "This username is taken"
                    }
                });
            }
            //TODO: hash password and create auth token -> done

            password = await bcrypt.hash(password, 12);

            const newUser = new User({email, username, password, createdAt: new Date().toISOString()}); //create a new user
            const res = await newUser.save(); //save user to database
            
            const token =  generate_token(res);//create a token for user
            

            return {
                ...res._doc,
                id: res._id,
                token, 
            }
        }
    }
}