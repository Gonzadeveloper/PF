import express from "express"
// import { deleteReview } from "../controllers/deleteReview";
import { postReview } from "../controllers/postReview";
import { deleteReview } from "../controllers/deleteReview";
 import { getAllReview } from "../controllers/getAllReview";
// import { putOReview } from "../controllers/putReview";


const router = express.Router()


 router.post ('/', postReview);
 router.get ('/', getAllReview);
 router.delete('/:id', deleteReview);
// router.put ('/:id', putOReview);


export default router;