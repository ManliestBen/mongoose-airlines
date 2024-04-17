import mongoose from "mongoose"

const Schema = mongoose.Schema

const mealSchema = new Schema({
  airline: {
    type: String,
    enum: ['American', 'Southwest', 'United']
  },
  airport: {
    type: String,
    enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
    default: 'DEN'
  },
  flightNo: {
    type: Number,
    min: 10,
    max: 9999
  },
  departs: {
    type: Date,
    default: function () {
      const defaultDate = new Date()
      return defaultDate.setFullYear(new Date().getFullYear() + 1)
    }
  }
})

const Meal = mongoose.model('Meal', mealSchema)

export {
  Meal
}