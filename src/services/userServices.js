const userDao = require('../dao/userDao');
const crypto = require('crypto-js');
const jwt = require('jsonwebtoken');

module.exports = {
    createUser: async (userObj) => {
    
        try {
            // Check if user with the same email already exists
            const existingUser = await userDao.getUserByEmail(userObj.email);
            if (existingUser) {
                throw new Error('User with the same email already exists');
            }

            var ciphertext = crypto.AES.encrypt(userObj.password, 'asdfghjkl').toString();
            const newUser = await userDao.createUser({
                ...userObj,
                password: ciphertext
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
            var bytes  = crypto.AES.decrypt(user.password, 'asdfghjkl');
            var originalText = bytes.toString(crypto.enc.Utf8);
            console.log(originalText);
            if (originalText == userObj.password) {
                const token = jwt.sign({ userId: user.id }, process.env.JWT_CRED, {
                  expiresIn: tokenExpiry
                });
                return token;
            }else{
            return null;
          }
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