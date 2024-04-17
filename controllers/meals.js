import { Meal } from "../models/meal.js"

async function newMeal(req, res) {
  try {
    const meals = await Meal.find({})
    res.render('meals/new', {
      meals,
      title: 'Add Meal'
    })
  } catch (error) {
    console.log(error)
    res.redirect('/flights')
  }
}

export {
  newMeal as new
}