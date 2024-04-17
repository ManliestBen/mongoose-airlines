import { Meal } from "../models/meal.js"

async function newMeal(req, res) {
  try {
    let errMsg = null
    if (req.query.err === 'duplicate') {
      errMsg = 'Please verify that the meal is not on the list!'
    }
    const meals = await Meal.find({})
    res.render('meals/new', {
      meals,
      title: 'Add Meal',
      errMsg
    })
  } catch (error) {
    console.log(error)
    res.redirect('/flights')
  }
}

async function create(req, res) {
  try {
    const checkForExistingMeal = await Meal.findOne({normalizedName: req.body.name.toLowerCase()})
    if (checkForExistingMeal) {
      res.redirect('/meals/new?err=duplicate')
    } else {
      req.body.normalizedName = req.body.name.toLowerCase()
      await Meal.create(req.body)
      res.redirect('/meals/new')
    }
  } catch (error) {
    console.log(error)
    res.redirect('/flights')
  }
}

export {
  newMeal as new,
  create
}