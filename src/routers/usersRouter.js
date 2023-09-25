/* eslint-disable object-curly-spacing */
const express = require('express');
const multer = require('multer');
const path = require('path');

const FILE_DIR = path.resolve('./tmp');
const router = new express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, FILE_DIR);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const { asyncWrapper } = require('../helpers/apiHelpers');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { patchUserController } = require('../../controllers/userController');
const { avatarController } = require('../../controllers/userController');
const uploadMiddleware = multer({ storage });

router.patch(
  '/subscription',
  authMiddleware,
  asyncWrapper(patchUserController)
);

router.patch(
  '/avatar',
  authMiddleware,
  uploadMiddleware.single('avatar'),
  asyncWrapper(avatarController)
);

module.exports = {
  usersRouter: router,
};
