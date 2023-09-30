const DishDao = require('../dao/dishDao');

module.exports = {
    addDish: async (dishData) => {
        try {
          const newDish = await DishDao.createDish(dishData);
          return newDish;
        } catch (error) {
          throw error;
        }
    },
    updateDish: async (id, dishData) => {
        try{
            const updatedDish = await DishDao.updateDish(id, dishData);
            return updatedDish;
        } catch (error) {
            throw error;
        }
    },
    recommendMeal: async (cuisine, diet) => {
        try {
            const criteria = {
                Cuisine: cuisine,
            };

            if (diet === 'Vegetarian') {
                criteria.Diet = 'Vegetarian';
            } else if (diet === 'Eggetarian') {
                criteria.Diet = { $in: ['Vegetarian', 'Eggetarian'] };
            } else if (diet === 'Non Vegetarian') {
                criteria.Diet = { $in: ['Vegetarian', 'Non Vegetarian', 'Eggetarian'] };
            }

            let meals = [];
            for (let i = 0; i < 7; i++) {
                const dishes = await DishDao.getDishesByCriteria(criteria);
                meals.push(dishes);
            }
            return meals;
        } catch (error) {
            throw error;
        }
    },
    recommendMealShuffle: async (cuisine, diet, course ) => {
        try {
            const criteria = {
                Cuisine: cuisine,
            };

            if (diet === 'Vegetarian') {
                criteria.Diet = 'Vegetarian';
            } else if (diet === 'Eggetarian') {
                criteria.Diet = { $in: ['Vegetarian', 'Eggetarian'] };
            } else if (diet === 'Non Vegetarian') {
                criteria.Diet = { $in: ['Vegetarian', 'Non Vegetarian', 'Eggetarian'] };
            }

            if(course == "Breakfast"){
                criteria.Course = { $in: [ 'Breakfast', 'South Indian Breakfast', 'Indian Breakfast', 'North Indian Breakfast', 'World Breakfast']};
                const breakfast = await DishDao.getOneTimeMeal(criteria);
                return {
                    "Breakfast": breakfast
                };
            }else if (course == "Lunch"){
                criteria.Course = { $in: ['Lunch', 'Main Course'] };
                const lunch = await DishDao.getOneTimeMeal(criteria);
                criteria.Course = "Side Dish";
                const sideDish = await DishDao.getOneTimeMeal(criteria);
                return {
                    "Lunch": lunch,
                    "Side Dish": sideDish
                };
            }else if(course == "Snacks"){
                criteria.Course = { $in: ['Snack', 'Appetizer'] };
                const snacks = await DishDao.getOneTimeMeal(criteria);
                return {
                    "Snacks": snacks
                };
            }else{
                criteria.Course = "Main Course";
                const dinner = await DishDao.getOneTimeMeal(criteria);
                criteria.Course = "Side Dish";
                const sideDish = await DishDao.getOneTimeMeal(criteria);
                criteria.Course = "Dessert";
                const dessert = await DishDao.getOneTimeMeal(criteria);
                return {
                    "Dinner": dinner,
                    "Side Dish": sideDish,
                    "Dessert": dessert
                };
            }
        } catch (error) {
            throw error;
        }
    }
}