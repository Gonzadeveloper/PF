import express from "express"
// import { deleteReview } from "../controllers/deleteReview";
import { postReview } from "../controllers/postReview";
import { deleteReview } from "../controllers/deleteReview";
 import { getAllReview } from "../controllers/getAllReview";
 import { getProductReviewAverage, getUserReviewAverage } from '../controllers/reviewController'
// import { putOReview } from "../controllers/putReview";
import authenticateToken from "../../ProteccionRutas/middleware";


const router = express.Router()


 router.post ('/', authenticateToken, postReview);
 router.get ('/', getAllReview);
 router.delete('/:id', authenticateToken, deleteReview);
 router.get('/product/:productId/average-rating', getProductReviewAverage);
router.get('/user/:userId/average-rating', getUserReviewAverage);
// router.put ('/:id', putOReview);


export default router;