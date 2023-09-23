const User = require("../models/user");
const userServices = require("../services/userServices");



module.exports = {
    register: async (req, res) => {
        try {
            const newUser = await userServices.createUser(req.body);
            delete newUser.password;
            res.json(newUser);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }, 
    login: async (req, res) => {
        try{
            const user = await userServices.getUser(req.body);
            if (!user) {
            return res.json({
                status: 400,
                message: 'Looks like you are not registered with us.',
                data: {}
            });
            }
            // console.log(user);
            const token = await userServices.authenticate(user, req.body);
            if (token) {
                const userWithoutPassword = { ...user.toObject() };
                delete userWithoutPassword.password;
                console.log(userWithoutPassword);
                return res.json({
                    status: 200,
                    message: 'Login sucessful',
                    data: { token, userWithoutPassword }
                });
            }

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    updateUser: async (req, res) => {
        try {
            const updateUser = userServices.updateUser(req.params.id, req.body);
            const userWithoutPassword = { ...updateUser.toObject() };
            delete userWithoutPassword.password;
            return res.status(200).json({
                message: 'User updated Sucessfully',
                data: userWithoutPassword
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    test: async (req, res) => {
        console.log("Hi");
        res.status(200).json({
            message: "Hi"
        });
    }
}