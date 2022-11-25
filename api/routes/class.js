const express = require('express');

const router = express.Router();
const {
  createClass,
  getClass,
  getClassByName,
  getClasses,
  updateClass
} = require('../controllers/class');
const { isAuth } = require('../middlewares/config/auth');
const {
  validateRegisterClass,
  classVlidation,
  classValidationById,
  classValidationByClass,
  classValidationByNameAndSubject
} = require('../middlewares/validation/class');

router.post('/class', isAuth, classVlidation, validateRegisterClass, createClass);
router.get('/class/:className/:subject', isAuth, classValidationByNameAndSubject, classVlidation, getClass);
router.get('/className/:className', isAuth, classValidationByClass, classVlidation, getClassByName);
router.get('/classes', isAuth, classVlidation, getClasses);
router.put('/classId/:_id', isAuth, classVlidation, classValidationById, updateClass);

module.exports = router;