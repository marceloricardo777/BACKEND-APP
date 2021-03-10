import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as config from '../config/variablesglobal';

export const auth = async (request: Request, response: Response, next: NextFunction) => {
    const authHeader = request.headers.authorization
    if (!authHeader) {
        return response.json({ message: 'não autorizado' })
    }
    //o token manda o Bearer mais o token(ksdjsviodjv), so quero o token
    const [, token] = authHeader.split(' ')
    try {
        await jwt.verify(token, config.APP_SECRET)
        next()
    } catch (error) {
        return response.json({ message: 'token invalido' })
    }
}

