const Joi = require("joi");

const regexValue =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;

const userRegisterValidate = (req, res, next) => {
  const schema = Joi.object({
    fullName: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    // password: Joi.string().min(4).alphanum().required()
    password: Joi.string().min(8).regex(regexValue).required(),
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Bad Request", error });
  }
  next();
};

const userLoginValidate = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    // password: Joi.string().min(4).alphanum().required(),
    password: Joi.string().min(8).regex(regexValue).required(),
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Bad Request", error });
  }
  next();
};

module.exports = {
  userRegisterValidate,
  userLoginValidate,
};
