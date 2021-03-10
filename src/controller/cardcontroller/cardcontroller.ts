import { getRepository } from 'typeorm';
import { Response, Request } from 'express';
import { User } from '../../entity/User';

class Cardcontroller {
    public async getCard(request: Request, response: Response): Promise<Response> {
        try {
            const card = await getRepository(User).find({ where: { id: request.params.id } });
            // const card = await getRepository(User)
            // .createQueryBuilder("user")
            // .innerJoinAndSelect("user.card", "card")
            // .innerJoinAndSelect("card.")
            // .getOne();
            return response.json(typeof card[0].card !== 'undefined' ? card[0].card.quantity : '')
        } catch (error) {

            return response.json({
                error: 'Error',
                message: error.message
            })
        }
    }
}

export default new Cardcontroller();