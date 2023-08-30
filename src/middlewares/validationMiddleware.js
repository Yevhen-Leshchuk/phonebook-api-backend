const Joi = require('joi');
const { ValidationError } = require('../helpers/errors');

module.exports = {
  addPostValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net', 'lv'] },
      }),
      phone: Joi.string()
        .min(7)
        .max(10)
        .pattern(/^[0-9]+$/)
        .required(),
      favorite: Joi.boolean(),
    });

    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      next(new ValidationError(validationResult.error.message));
    }

    next();
  },

  addPutValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net', 'lv'] },
      }),
      phone: Joi.string()
        .min(7)
        .max(10)
        .pattern(/^[0-9]+$/)
        .required(),
      favorite: Joi.boolean().required(),
    });

    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ status: validationResult.error.message });
    }

    next();
  },

  addPatchValidation: (req, res, next) => {
    const schema = Joi.object({
      favorite: Joi.boolean().required(),
    });

    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ status: validationResult.error.message });
    }

    next();
  },

  addAuthValidation: (req, res, next) => {
    const schema = Joi.object({
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net', 'lv'] },
      }),
      password: Joi.string().min(3).max(30).required(),
    });

    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      next(new ValidationError(validationResult.error.message));
    }

    next();
  },
};
