require("dotenv").config();
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

// 1. Use mongoose to establish a connection to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/' + process.env.DB_NAME);

// 2. Set up any schema and models needed by the app
const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    unique: true
  },
  name: String,
  gender: { type: String, enum: ['male', 'female'], default: 'female' },
  weight_kg: { type: Number, default: 50 },
  height_cm: { type: Number, default: 160 },
  age: { type: Number, default: 30 }
});

const mealSchema = new mongoose.Schema({
  user_id: { type: String, ref: 'User', required: true },
  date: { type: Date, default: Date.now, required: true },
  food_name: String,
  nf_calories: Number
});

const User = mongoose.model('User', userSchema);
const Meal = mongoose.model('Meal', mealSchema);


// 3. Export the models
module.exports.User = User;
module.exports.Meal = Meal;


