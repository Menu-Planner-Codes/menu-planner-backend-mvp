const User = require("../models/dish");
const DishService = require("../services/dishServices");



module.exports = {
    addDish: async (req, res) => {
        try {
          const newDish = await DishService.addDish(req.body);
          res.status(201).json({ message: 'Dish added successfully', dish: newDish });
        } catch (error) {
          res.status(500).json({ message: 'Failed to add dish' });
        }
    },
    updateDish: async (req, res) => {
        try {
            const updatedDish = await DishService.updateDish( req.params.id, req.body );
            res.status(201).json({ message: 'Dish updated successfully', dish: updatedDish });
        } catch (error) {
            res.status(500).json({ message: 'Failed to add dish' });
        }
    },
    recommendMealPlan: async (req, res) => {
        try{
            const { cuisine, diet } = req.body;
            // Call the service function to recommend a meal plan
            const recommendedPlan = await DishService.recommendMeal(cuisine, diet);

            return res.status(200).json({
                status: 200,
                result: recommendedPlan
            });
        } catch (error) {
            throw error
        }
    },
    recommendMeal: async (req, res) => {
        try{
            const { cuisine, diet, course } = req.body;
            // Call the service function to recommend a meal plan
            const recommendedPlan = await DishService.recommendMealShuffle(cuisine, diet, course);

            return res.status(200).json({
                status: 200,
                result: recommendedPlan
            });
        } catch (error) {
            throw error
        }
    },
}