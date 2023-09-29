const userDao = require('../dao/userDao');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    createUser: async (userObj) => {
    
        try {
            // Check if user with the same email already exists
            const existingUser = await userDao.getUserByEmail(userObj.email);
            if (existingUser) {
                throw new Error('User with the same email already exists');
            }
            const hashedPassword = await bcrypt.hash(userObj.password, 10);
            const newUser = await userDao.createUser({
                ...userObj,
                password: hashedPassword
            });

            delete newUser.password;

            const tokenExpiry = '60d'
            const token = jwt.sign({ userId: userObj.id }, process.env.JWT_CRED, {
                expiresIn: tokenExpiry
            });
            const userWithoutPassword = newUser;
            return {
                token,
                userWithoutPassword
            };
        } catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
    },

    authenticate: async (user, userObj, tokenExpiry = '60d') => {
        try {
          if (bcrypt.compare(user.password, userObj.password)) {
            const token = jwt.sign({ userId: userObj.id }, process.env.JWT_CRED, {
              expiresIn: tokenExpiry
            });
            return token;
          }
          return false;
        } catch (error) {
          throw new Error(error);
        }
    },

    getUser: async (userObj) => {
        try{
            return userDao.getUserByEmail(userObj.email);
        } catch (error) {
            throw new Error(error);
        }
    },
    updateUser: async (id, userObj) => {
        try{
            return userDao.updateUser(id, userObj);
        } catch (error) {
            throw new Error(error);
        }
    }
}