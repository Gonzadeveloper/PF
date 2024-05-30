import express from "express"
import routesProduct  from './routesProduct';
import routesUser  from './routesUser';
import routesCategory  from './routesCategory';
import routesOrder from './routesOrder'
import routesReview from './routesReview'
import routesPasarela from './routesPasarela'

const router = express.Router()


router.use('/product', routesProduct)
router.use('/user', routesUser)
router.use('/category', routesCategory)
router.use('/order', routesOrder)
router.use('/review', routesReview)
router.use('/payment', routesPasarela)


export default router;
