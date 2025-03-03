const Review = require('../models/review.js');

// Create a new review
const createReview = async (req, res) => {
    try {

        console.log("inside createReview");

        const userId = req.user.id;

        const { reviewData } = req.body;

        const { machineId, rating, reviewtext } = reviewData;

        const review = await Review.create(
            {
                userId,
                machineId,
                rating,
                review: reviewtext
            }
        );
        res.status(201).json({
            status: 'success',
            data: {
                review
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

// Get all reviews
const getAllReviews = async (req, res) => {
    try {
        const machineId = req.params.id;

        console.log("machineId: ", machineId);

        const reviews = await Review.find({ machineId }).populate('userId', 'name');

        console.log("reviews: ", reviews);

        res.status(200).json({
            status: 'success',
            results: reviews.length,
            reviews
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};


// Update a review by ID
const updateReview = async (req, res) => {
    try {

        const userId = req.user.id;

        const reviewId = req.params.id;

        const { rating, reviewText } = req.body;
        
        const review = await Review.findOneAndUpdate(
            { _id: reviewId, userId },
            {userId, rating, review: reviewText},
            { new: true, runValidators: true }
        );

        console.log("review updated: ", review);
       
        if (!review) {
            return res.status(404).json({
                status: 'fail',
                message: 'No review found with that ID'
            });
        }
        
        res.status(200).json({
            status: 'success',
            data: {
                review
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

// Delete a review by ID
const deleteReview = async (req, res) => {
    try {

        const reviewId = req.params.id; 

        const review = await Review.findByIdAndDelete(reviewId);

        if (!review) {
            return res.status(404).json({
                status: 'fail',
                message: 'No review found with that ID'
            });
        }

        res.status(204).json({
            status: 'success',
            data: null
        });

    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
};

module.exports = {
    createReview,
    getAllReviews,
    updateReview,
    deleteReview
};