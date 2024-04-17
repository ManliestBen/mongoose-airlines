import { Flight } from "../models/flight.js"
import { Meal } from "../models/meal.js"

async function index(req, res) {
  try {
    const flights = await Flight.find({})
    res.render('flights/index', {
      flights,
      title: 'All Flights'
    })
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
}

async function show(req, res) {
  try {
    const flight = await Flight.findById(req.params.flightId).populate('meals')
    const mealsNotInFlight = await Meal.find({_id: {$nin: flight.meals}})
    res.render('flights/show', {
      flight,
      title: 'Flight Details',
      mealsNotInFlight
    })
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
}

async function create(req, res) {
  try {
    for (let key in req.body) {
      if (req.body[key] === '') delete req.body[key]
    }
    const flight = await Flight.create(req.body)
    res.redirect(`/flights/${flight._id}`)
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
}

async function update(req, res) {
  try {
    const flight = await Flight.findByIdAndUpdate(req.params.flightId, req.body, {new: true})
    res.redirect(`/flights/${flight._id}`)
  } catch (error) {
    console.log(error)
    res.redirect('/flights')
  }
}

async function deleteFlight(req, res) {
  try {
    const flight = await Flight.findByIdAndDelete(req.params.flightId)
    res.redirect('/flights')
  } catch (error) {
    console.log(error)
    res.redirect('/flights')
  }
}

async function newFlight(req, res) {
  try {
    let offset = new Date().getTimezoneOffset() * 60000
    let oneYearFromNow = new Date().setFullYear(new Date().getFullYear() + 1)
    let localISOTime = new Date(oneYearFromNow - offset).toISOString().slice(0, 16)
    res.render('flights/new', {
      title: 'Add Flight',
    })
  } catch (error) {
    console.log(error)
    res.redirect('/flights')
  }
}

async function edit(req, res) {
  try {
    const flight = await Flight.findById(req.params.flightId)
    let offset = new Date().getTimezoneOffset() * 60000
    let localISOTime = new Date(flight.departs - offset).toISOString().slice(0, 16)
    res.render('flights/edit', {
      title: 'Edit Flight',
      flight,
      localISOTime
    })
  } catch (error) {
    console.log(error)
    res.redirect('/flights')
  }
}

async function createTicket(req, res) {
  try {
    let flight = await Flight.findById(req.params.flightId)
    flight.tickets.push(req.body)
    await flight.save()
    res.redirect(`/flights/${flight._id}`)
  } catch (error) {
    console.log(error)
    res.redirect('/flights')
  }
}

async function deleteTicket(req, res) {
  try {
    let flight = await Flight.findById(req.params.flightId)
    flight.tickets.remove({_id: req.params.ticketId})
    await flight.save()
    res.redirect(`/flights/${flight._id}`)
  } catch (error) {
    console.log(error)
    res.redirect('/flights')
  }
}

async function addMeal(req, res) {
  try {
    let flight = await Flight.findById(req.params.flightId)
    flight.meals.push(req.body.mealId)
    await flight.save()
    res.redirect(`/flights/${flight._id}`)
  } catch (error) {
    console.log(error)
    res.redirect('/flights')
  }
}

async function removeMeal(req, res) {
  try {
    let flight = await Flight.findById(req.params.flightId)
    flight.meals.remove({_id: req.params.mealId})
    await flight.save()
    res.redirect(`/flights/${flight._id}`)
  } catch (error) {
    console.log(error)
    res.redirect('/flights')
  }
}

export {
  index,
  show,
  create,
  deleteFlight as delete,
  update, 
  edit,
  newFlight as new,
  createTicket,
  deleteTicket,
  addMeal,
  removeMeal
}