const models = require('../models');

module.exports = {

  getUserData: async (req, res) => {
    // console.log("IM IN GET USER");
    models.users.getUserById(req.params, (err, data) => {
      if (err) {
        console.error('ERR WITH RETRIEVING DATA FROM DB: ', err);
        res.sendStatus(400);
      } else {
        // console.log('SUCCESS WITH RETRIEVING DATA FROM DB: ', data);
        res.status(200).json(data);
      }
    });
  },

  createOrUpdateUser:  (req, res) => {
    // console.log("IM IN POST USER");
    models.users.upsertUser(req.body, (err) => {
      if (err) {
        console.error('ERR WITH RETRIEVING DATA FROM DB: ', err);
        res.sendStatus(400);
      } else {
        res.status(201).json({ message: 'User created successfully' });
      }
    });
  }

};