const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const db = require('../models');
const UserService = require('../services/UserServices');
const userService = new UserService(db);

// GET all users
router.get('/', async function(req, res, next) {
  // #swagger.tags = ['Users']
  // #swagger.description = "Gets the list of all users."
  try {
    // Call the getAll method of the UserService to retrieve all users
    const users = await userService.getAll();
    // Send the users as the response
    res.send(users);
  } catch (error) {
    // Handle any errors that occur
    console.error(error);
    res.status(500).send('Could not get users');
  }
});

// POST a new user
router.post('/', jsonParser, async function(req, res, next) {
  // #swagger.tags = ['Users']
  // #swagger.description = "Adds the user based on parameters provided in the request's body"
  /* #swagger.parameters['body'] =  {
    "name": "body",
    "in": "body",
      "schema": {
        $ref: "#/definitions/User"    }
  }
  */
  try {
    // Destructure the username, password, and score from the request body
    const { username, password, score } = req.body;
    // Call the create method of the UserService to create a new user
    await userService.create(username, password, score);
    // Send a success message as the response
    res.send('User created');
  } catch (error) {
    // Handle any errors that occur
    console.error(error);
    res.status(500).send('Could not create user');
  }
});

// DELETE a user
router.delete('/', jsonParser, async function(req, res, next) {
  // #swagger.tags = ['Users']
  // #swagger.description = "Deletes a user of ID provided in the request's body."
  try {
    // Get the user ID from the request body
    const { id } = req.body;
    // Call the deleteUser method of the UserService to delete the user
    await userService.deleteUser(id);
    // Send a success message as the response
    res.send('User deleted');
  } catch (error) {
    // Handle any errors that occur
    console.error(error);
    res.status(500).send('Could not delete user');
  }
});

module.exports = router;