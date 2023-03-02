var { User } = require('../db');
module.exports = {

  getUserById: async (query, callback) => {
    const { uid } = query;
    User.findOne({ _id: uid })
      .then(result => callback(null, result))
      .catch(err => callback(err))
  },

  upsertUser: async (query, callback) => {
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
  }

};