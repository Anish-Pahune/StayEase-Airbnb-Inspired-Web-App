const joi = require("joi");

module.exports.listingSchema = joi.object({
    listing: joi.object({
        title: joi.string().max(100).required(),
        description: joi.string().max(1000).required(),
        // image: joi.string().required(),
        price: joi.number().required().min(0),
        location: joi.string().required(),
        country: joi.string().required(),
        category: joi.string().required(),
    }).required()
})

module.exports.reviewSchema = joi.object({
    review: joi.object({
        rating: joi.number().required().min(1).max(5),
        comment: joi.string().max(500).required(),
    }).required()
})

module.exports.userSchema = joi.object({
    user: joi.object({
        username: joi.string()
            .min(5)
            .max(30)
            .required()
            .messages({
                "string.empty": "Username is required.",
                "string.min": "Username must be at least 5 characters long.",
                "string.max": "Username cannot exceed 30 characters."
            }),
        email: joi.string()
            .email()
            .required()
            .messages({
                "string.email": "Please enter a valid email address.",
                "string.empty": "Email is required."
            }),
        password: joi.string()
            .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%&*_-])[A-Za-z\\d!@#$%&*_-]{8,}$"))
            .required()
            .messages({
                "string.pattern.base": "Password must be 8 character long with upper, lower, number & special symbol.",
                "string.empty": "Password is required."
            }),
    }).required()
})