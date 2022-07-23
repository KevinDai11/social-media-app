module.exports.validateRegisterInput = (username, email, password, confirmPassword) => { //validate user input data for register
    const errors = {};
    if(username.trim() === '') { //checks if username is empty
        errors.username = 'Username must not be empty'; 
    }
    if(email.trim() === '') { //checks if email is empty
        errors.email = 'Email must not be empty';
    }
    else{ //checks if email is valid
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(!regex.test(email)) {
            errors.email = 'Email is not valid';
        }
    }
    if(password.trim() === '') { //checks if password is empty
        errors.password = 'Password must not be empty';
    }
    else if(password !== confirmPassword) { //checks if password and confirm password match
        errors.confirmPassword = 'Passwords must match';
    }

    return {
        errors,
        valid: Object.keys(errors).length === 0 
    }
    

}




module.exports.validateLoginInput = (username, password) => { //validate user input data for login
    const errors = {};
    if(username.trim() === '') { //checks if username is empty
        errors.username = 'Username must not be empty';
    }
    if(password.trim() === '') { //checks if password is empty
        errors.password = 'Password must not be empty';
    }
    return {
        errors,
        valid: Object.keys(errors).length === 0 
    }
}

