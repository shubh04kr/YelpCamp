// const express = require('express');
// const router = express.Router({mergeParams:true});


// const Campground = require('../models/campground');
// const Reviews = require('../models/review')


// const { reviewSchema } = require('../schemas.js')

// const catchAsync = require('../utils/catchAsync')
// const ExpressError = require('../utils/ExpressError')


// const validateReview = (req, res, next) => {

//     //const result = campgroundSchema.validate(req.body);
//     const { error } = reviewSchema.validate(req.body);

//     if (error) {
//         const msg = error.details.map(el => el.message).join(',')
//         throw new ExpressError(msg, 400)
//     } else {
//         next();
//     }
// }



// router.post('/', validateReview, catchAsync(async (req, res) => {
//     res.send("You made It")
// }))


// //router.delete('/:reviewId)