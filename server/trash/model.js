const { User, Meal } = require('./db.js');

const getUserById = async (query, callback) => {
  const { uid } = query;
  User.findOne({ _id: uid })
    .then(result => callback(null, result))
    .catch(err => callback(err))
};


const addMeal = async (user_id, foodData, callback) => {
  // console.log('user_id in model: ', user_id);
  // console.log('foodData in model: ', foodData);

  const mealData = foodData.map(({ food_name, nf_calories }) => ({
    user_id: user_id, // or you can get it from the req object
    date: new Date(),
    food_name: food_name,
    nf_calories: nf_calories
  }));

  Meal.create(mealData)
    .then(result => callback(null, result))
    .catch(err => callback(err))
};

const upsertUser = async (query, callback) => {
  const { uid, name, gender, weight_kg, height_cm, age } = query;
  console.log('uid: ', uid)
  const filter = { _id: uid };
  const update = {
    _id:uid,
    name: name,
    gender,
    weight_kg,
    height_cm,
    age
  };
  const options = { upsert: true, new: true, setDefaultsOnInsert: true };
  User.findOneAndUpdate(filter, update, options)
    .then(result => callback(null))
    .catch(err => callback(err))
};




module.exports.upsertUser = upsertUser;
module.exports.getUserById = getUserById;
module.exports.addMeal = addMeal;

