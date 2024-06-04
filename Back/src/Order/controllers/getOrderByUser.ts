import { Request, Response } from 'express';
import { Order } from '../../models/Order';
import { ProductOrder } from '../../models/ProductOrder';
import { User } from '../../models/User';

export const getOrderByUser = async (req: Request, res: Response): Promise<void> => {
    const { idUser } = req.params;

    try {
        const orders = await Order.findAll({
            where: {
                userId: idUser,
            },
            include: [
                {
                    model: ProductOrder
                },
                {
                    model: User
                }
            ]
        });

        if (orders.length === 0) {
            res.status(404).json({ message: 'No orders found for this user' });
        } else {
            res.status(200).json(orders);
        }
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error });
    }
};


// // Función que incluye la vinculación con el pago asociado (en la anterior, no asocia payment):

// import { Request, Response } from 'express';
// import { Order } from '../../models/Order';

// export const getOrderByUser = async (req: Request, res: Response): Promise<void> => {
//     const { idUser } = req.params;

//     try {
//         const orders = await Order.findAll({
//             where: {
//                 userId: idUser,
//             },
//             include: [{ all: true }] // Incluye todas las asociaciones relacionadas
//         });

//         if (orders.length === 0) {
//             res.status(404).json({ message: 'No orders found for this user' });
//         } else {
//             res.status(200).json(orders);
//         }
//     } catch (error) {
//         res.status(500).json({ message: 'An error occurred', error });
//     }
// };
