import { getRepository } from 'typeorm';
import { Response, Request } from 'express';
import { UsersAdmin } from '../entity/UsersAdmin';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as config from '../config/variablesglobal';

class UserAdmincontroller {
    public async getLoginAdmin(request: Request, response: Response): Promise<Response> {
        try {
            await getRepository(UsersAdmin)
                .find({
                    select: ['active', 'createdAt', 'email', 'fullName', 'id', 'level', 'password', 'updateAt'],
                    where: { email: request.body.email },
                }).then(async (result) => {
                    if (result.length === 0) {
                        return response.json({ message: 'Email ou senha incorreto' })
                    }
                    else {
                        if (await bcrypt.compare(request.body.password, result[0].password || '')) {
                            const token = jwt.sign({ id: result[0].id }, config.APP_SECRET_ADMIN, {
                                expiresIn: '1d'
                            })
                            const data = {
                                id: result[0].id,
                                name: result[0].fullName,
                                email: result[0].email,
                                level: result[0].level,
                                token
                            }
                            return response.json(data);
                        }
                        else {
                            return response.json({ message: 'Email ou senha incorreto' })
                        }

                    }
                })
                .catch((error) => {
                    return response.json(Promise.reject(error));
                });
        }
        catch (error) {
            return response.json({
                error: 'Error',
                message: error.message
            })
        }
        return response.json()
    }



    public async saveUserAdmin(request: Request, response: Response): Promise<Response> {
        try {
            const cad = await getRepository(UsersAdmin)
                .findAndCount({
                    where: [{ email: request.body.values.email }],
                })

            if (cad[1] > 0) {
                return response.json({ resposta: 'Já existe um usuario com esse email' })
            }
            else {
                request.body.values.password = await bcrypt.hash(request.body.values.password, 8)
                const user = new UsersAdmin();
                user.email = request.body.values.email;
                user.password = request.body.values.password;
                user.fullName = request.body.values.fullName;


                await getRepository(UsersAdmin).save(user)

                return response.json({ sucesso: 'Cadastro Feito com Sucesso' })
            }
        } catch (error) {
            return response.send({
                error: 'Error',
                message: error.message
            })
        }
    }
}

export default new UserAdmincontroller()