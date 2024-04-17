import mongoose from "mongoose"

const Schema = mongoose.Schema

const flightSchema = new Schema({

})

const Flight = mongoose.model('Flight', flightSchema)

export {
  Flight
}