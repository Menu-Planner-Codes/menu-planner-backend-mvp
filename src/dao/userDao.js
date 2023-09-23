const User = require("../models/user");



module.exports = {
    createUser: async (userObj) => {
        const user = new User(userObj);
        return user.save();
    },
    getUserByEmail: async (email) => {
        return User.findOne({
                email: email
            });
    },
    updateUser: async (id, userObj) => {
        // Find the document by ID and update it
        const updatedDocument = await User.findByIdAndUpdate(id, userObj, {
            new: true, // To return the updated document
            runValidators: true, // To run validation on the updated data
        });
    
        return updatedDocument;
    }
}