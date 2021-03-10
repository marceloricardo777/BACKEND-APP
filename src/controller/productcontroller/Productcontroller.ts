import { getRepository } from 'typeorm';
import { Response, Request } from 'express';
import { Product } from '../../entity/entity_product/Product';

class Productcontroller {
    public async getProducts(request: Request, response: Response): Promise<Response> {

        try {
            const listproducts = await getRepository(Product).find({ relations: ['variationproduct', 'imageproducts'] });

            return response.json(listproducts)
        } catch (error) {

            return response.json({
                error: 'Error',
                message: error.message
            })
        }
    }
}

export default new Productcontroller();