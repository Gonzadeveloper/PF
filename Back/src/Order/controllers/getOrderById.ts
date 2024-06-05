import { Request, Response } from 'express';
import { Order } from '../../models/Order';
import { ProductOrder } from '../../models/ProductOrder';

export const getOrderById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const order = await Order.findByPk(id, {
            include: [
                {
                    model: ProductOrder
                }
            ]
        });

        if (!order) {
            res.status(404).json({ message: 'Order not found' });
        } else {
            res.status(200).json(order);
        }
    } catch (error) {
        console.error('Error getting order by ID:', error);
        res.status(500).json({ message: 'An error occurred', error });
    }
};

// import { Request, Response } from 'express';
// import { Order } from '../../models/Order';
// import { ProductOrder } from '../../models/ProductOrder';

// export const getOrderById = async (req: Request, res: Response): Promise<void> => {
//     const { id } = req.params;

//     try {
//         const order = await Order.findByPk(id, {
//             include: [
//                 {
//                     model: ProductOrder
//                 }
//             ]
//         });

//         if (!order) {
//             res.status(404).json({ message: 'Order not found' });
//         } else {
//             res.status(200).json(order);
//         }
//     } catch (error) {
//         console.error('Error getting order by ID:', error);
//         res.status(500).json({ message: 'An error occurred', error });
//     }
// };
