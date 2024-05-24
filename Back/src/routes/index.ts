import express from "express"
import routesProduct  from './routesProduct';
import routesUser  from './routesUser';
import routesCategory  from './routesCategory';
import routesOrder from './routesOrder'
import routesProductOrder from './routesProductOrder'
import routesPayment from './routesPayment'
import routesCart from './routesCart'
import routesCartProduct from './routesCartProduct'

const router = express.Router()


router.use('/product', routesProduct)
router.use('/user', routesUser)
router.use('/category', routesCategory)
router.use('/order', routesOrder)
router.use('/productorder', routesProductOrder)
router.use('/payment', routesPayment)
router.use('/cart', routesCart)
router.use('/cartproduct', routesCartProduct)


export default router;
