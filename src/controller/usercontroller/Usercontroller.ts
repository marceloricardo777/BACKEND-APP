import { getRepository } from 'typeorm';
import { Response, Request } from 'express';
import { User } from '../../entity/User';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Client } from '../../entity/Client'
import * as config from '../../config/variablesglobal';
class Usercontroller {
    public async getLogin(request: Request, response: Response): Promise<Response> {
        try {
            await getRepository(User)
                .find({
                    select: ['id', 'email', 'password'],
                    relations: ['client'],
                    where: { email: request.body.email },
                }).then(async (result) => {
                    if (result.length === 0) {
                        return response.json({ message: 'Email ou senha incorreto' })
                    }
                    else {
                        if (await bcrypt.compare(request.body.password, result[0].password || '')) {
                            const token = jwt.sign({ id: result[0].id }, config.APP_SECRET, {
                                expiresIn: '1d'
                            })
                            const data = {
                                id: result[0].id,
                                email: result[0].email,
                                client: result[0].client,
                                token
                            }
                            return response.json(data);
                        }
                        else {
                            return response.json({ message: 'Email ou senha incorreto' })
                        }
                    }
                })
        } catch (error) {
            return response.json({
                error: 'Error',
                message: error.message
            })
        }
        return response.json({ message: 'Erro interno' })
    }




    public async Register(request: Request, response: Response): Promise<Response> {
        try {
            const cad = await getRepository(User)
                .findAndCount({
                    where: [{ email: request.body.email }],
                })
            console.log(cad)
            if (cad[1] > 0) {
                return response.json({ message: 'Já existe cadastro com esse Email' })
            }
            else {
                request.body.password = await bcrypt.hash(request.body.password, 8)
                const user = new User();
                user.email = request.body.email;
                user.password = request.body.password;
                const client = new Client();
                client.name = request.body.nome;
                client.whatsapp = request.body.whatsapp;
                client.user = user;
                await getRepository(User).save(user)

                return response.json({ sucesso: 'Sucesso' })

            }
        } catch (error) {

            return response.json({
                error: 'Error',
                message: error.message
            })
        }

    }

}
export default new Usercontroller();