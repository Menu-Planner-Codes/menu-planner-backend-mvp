const Dish = require("../models/dish");




module.exports = {
    createDish: async (dishData) => {
        try {
          const newDish = new Dish(dishData);
          await newDish.save();
          return newDish;
        } catch (error) {
          throw error;
        }
    },
    updateDish: async (id, dishData) => {
        try{
            // Find the document by ID and update it
            const updatedDocument = await Dish.findByIdAndUpdate(id, dishData, {
                new: true, // To return the updated document
                runValidators: true, // To run validation on the updated data
            });
        
            return updatedDocument;
        } catch (error) {
            throw error;
        }
    },
    getDishesByCriteria: async (criteria) => {
        try {
            
            // Implement logic to query dishes based on criteria
            criteria.Course = { $in: [ 'Breakfast', 'South Indian Breakfast', 'Indian Breakfast', 'North Indian Breakfast', 'World Breakfast']};
            const breakfast = await Dish.find(criteria);
            let randomIndex = Math.floor(Math.random() * breakfast.length);
            const randomBreakfastDish = breakfast[randomIndex];
            criteria.Course = { $in: ['Lunch', 'Main Course'] };
            const lunch = await Dish.find(criteria);
            randomIndex = Math.floor(Math.random() * lunch.length);
            const randomLunchDish = lunch[randomIndex];
            criteria.Course = "Side Dish";
            const lunch_side_dish = await Dish.find(criteria);
            randomIndex = Math.floor(Math.random() * lunch_side_dish.length);
            const randomLunchSideDish = lunch_side_dish[randomIndex];
            criteria.Course = "Main Course";
            const dinner = await Dish.find(criteria);
            randomIndex = Math.floor(Math.random() * dinner.length);
            const randomDinnerDish = dinner[randomIndex];
            criteria.Course = "Side Dish";
            const dinner_side_dish = await Dish.find(criteria);
            randomIndex = Math.floor(Math.random() * dinner_side_dish.length);
            const randomDinnerSideDish = dinner_side_dish[randomIndex];
            criteria.Course = "Dessert";
            const dinner_dessert = await Dish.find(criteria);
            randomIndex = Math.floor(Math.random() * dinner_dessert.length);
            const randomDinnerDessert = dinner_dessert[randomIndex];
            criteria.Course = { $in: ['Snack', 'Appetizer'] };
            const snacks = await Dish.find(criteria);
            randomIndex = Math.floor(Math.random() * snacks.length);
            const randomSnack = snacks[randomIndex];

            const plan = {
                Breakfast: randomBreakfastDish,
                Lunch: randomLunchDish,
                LunchSideDish: randomLunchSideDish,
                Snacks: randomSnack,
                Dinner: randomDinnerDish,
                DinnerSideDish: randomDinnerSideDish,
                Dessert: randomDinnerDessert
            }
            return plan;
        } catch (error) {
            throw error;
        }
    },
    getOneTimeMeal: async (criteria) => {
        try {
            
            // Implement logic to query dishes based on criteria
            const dish = await Dish.find(criteria);
            let randomIndex = Math.floor(Math.random() * dish.length);
            const randomDish = dish[randomIndex];

            return randomDish;
        } catch (error) {
            throw error;
        }
    }
}