const express = require('express');
const router = express.Router();
const {addUser} = require('../Controllers/userController');
const {getUser} = require('../Controllers/userController');
const {updateUser} = require('../Controllers/userController');
const {removeUser} = require('../Controllers/userController');
const validate = require('../middleware/validate');
const verifyRole = require('../middleware/verifyRoles');

router.route('/')
    .get(validate,getUser)
    .post(validate,verifyRole("admin"),addUser)
    .put(validate,verifyRole("admin"),updateUser)
    .delete(validate,verifyRole("admin"),removeUser)

module.exports = router;