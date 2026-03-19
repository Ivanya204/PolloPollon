const reviewsController ={}
import reviewModel from "../models/reviews.js"

//select
reviewsController.getReviews = async (req, res)=>{
    const reviews = await reviewModel.find()
    res.json(reviews)
}

//insert
reviewsController.insertReviews = async (req, res) =>{
    const {
        rating,
        comment,
        idEmployee,
        idProducts
    } = req.body
    const newReview = new reviewModel({
        rating,
        comment,
        idEmployee,
        idProducts
    })
    await newReview.save()
    res.json({message: "Review save"})
}

//update
reviewsController.updateReview = async (req, res)=>{
    const {
        rating,
        comment,
        idEmployee,
        idProducts
    } = req.body
    await reviewModel.findByIdAndUpdate(req.params.id, {
        rating,
        comment,
        idEmployee,
        idProducts
    }, {new: true})
    res.json({message: "Review update"})
}

//delete
reviewsController.deleteReview = async (req, res) => {
    await reviewModel.findByIdAndDelete (req.params.id)
    res.json({message: "Review delete"})
}
export default reviewsController