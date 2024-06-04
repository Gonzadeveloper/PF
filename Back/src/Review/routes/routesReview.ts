import express from "express"
// import { deleteReview } from "../controllers/deleteReview";
import { postReview } from "../controllers/postReview";
import { deleteReview } from "../controllers/deleteReview";
import { getAllReview } from "../controllers/getAllReview";
import { getProductReviewAverage, getUserReviewAverage } from '../controllers/reviewController'
import { getReviewByIdProduct } from "../controllers/getReviewByIdProduct";
// import { putOReview } from "../controllers/putReview";


const router = express.Router()


router.post('/', postReview);
router.get('/user/:id', getReviewByIdProduct);
router.get('/', getAllReview);
router.delete('/:id', deleteReview);
router.get('/product/:productId/average-rating', getProductReviewAverage);
router.get('/user/:userId/average-rating', getUserReviewAverage);
// router.put ('/:id', putOReview);


export default router;