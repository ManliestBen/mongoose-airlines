import { Flight } from "../models/flight.js"

async function index(req, res) {
  try {
    const flights = await Flight.find({})
    res.render('flights/index', {
      flights,
      title: 'Add Flight'
    })
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
}

async function show(req, res) {
  try {
    const flight = await Flight.findById(req.params.flightId)
    res.render('flights/show', {
      flight,
      title: 'Flight Details'
    })
  } catch (error) {
    console.log(error)
    res.redirect('/')
  }
}

async function create(req, res) {
  try {
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
    res.render('flights/new', {
      title: 'Add Flight'
    })
  } catch (error) {
    console.log(error)
    res.redirect('/flights')
  }
}

async function edit(req, res) {
  try {
    const flight = await Flight.findById(req.params.flightId)
    res.render('flights/new', {
      title: 'Edit Flight',
      flight
    })
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
  newFlight as new
}