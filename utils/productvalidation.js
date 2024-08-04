const Joi = require("joi");

const productValidation = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string(3).max(25).required(),
    brand: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string().required(),
    category: Joi.string().required(),
    image: Joi.string().required(),
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Bad Request", error });
  }
  next();
};

module.exports = { productValidation };
