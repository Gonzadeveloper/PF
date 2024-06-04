import { Request, Response } from 'express';
import { Order } from '../../models/Order';
import { ProductOrder } from '../../models/ProductOrder';


interface OrderData {
  userId: number;
  orderDate: Date;
  orderStatus: string;
}
interface ProductData {
  orderId:number,
  productId: number,
  quantity: number,
  unitPrice: number,
}

const postOrder = async (req: Request, res: Response): Promise<void> => {
  //const orderData = req.body;
  const { userId, products } = req.body;
  console.log(userId);
  

  try {
    // Validar los datos de entrada
    if (!userId || !products || !Array.isArray(products) || products.length === 0) {
      res.status(400).json({ message: 'Debe enviar userId y un array de products no vacío' });
      return;
    }
   console.log(products);
   
    // Validar cada producto
    const validatedProducts: ProductData[] = [];
    for (const product of products) {
      const { productId, quantity, unitPrice } = product;
      if (productId && quantity && unitPrice) {
        validatedProducts.push({ productId, quantity, unitPrice } as any);
      } else {
        res.status(400).json({ message: 'Cada producto debe tener id, quantity y unitPrice' });
        return;
      }
    }

    const orderData: OrderData = {
      userId,
      orderDate: new Date(),
      orderStatus: 'Pendiente'
    };
     // Crear una nueva orden
     const newOrder = await Order.create(orderData as any);

     for (const product of validatedProducts) {
      await ProductOrder.create({
        orderId: newOrder.id,
        productId: product.productId,
        quantity: product.quantity,
        unitPrice: product.unitPrice,
      } as any);
    }
  

    res.status(201).json(newOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export { postOrder };
