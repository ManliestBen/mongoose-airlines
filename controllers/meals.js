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

async function create(req, res) {
  try {
    await Meal.create(req.body)
    res.redirect('/meals/new')
  } catch (error) {
    console.log(error)
    res.redirect('/flights')
  }
}

export {
  newMeal as new,
  create
}