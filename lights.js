const express = require('express');
const router = express.Router();
const {addLight, displayLights} = require('../Controllers/lightController');
const {removeLight} = require('../Controllers/lightController');
const verifyRole = require('../middleware/verifyRoles');
const validate = require('../middleware/validate');

router.route('/')
    .get(displayLights)
    .post(validate,verifyRole("admin"),addLight)
    .delete(validate,verifyRole("admin"),removeLight)

module.exports = router;