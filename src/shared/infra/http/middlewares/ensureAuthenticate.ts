import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import auth from '@config/auth';
import { UserTokensRepository } from '@modules/accounts/infra/typeorm/repositories/UsersTokenRepository';

import { AppError } from '../../../errors/AppError';

interface IPayload {
    sub: string;
}

export async function ensureAuthenticate(
    request: Request,
    response: Response,
    next: NextFunction,
) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError('Token is missing', 401);
    }

    /**
     * Modelo do token no header e Bearer 393292092390 o que importa pra mim e somente o token
     * Então vou ter que dividir esse meu headers e dois, e o metodo split faz isso ele vai separar ele em dois assim
     * [0]Bearer o primeiro array vai ser o meu bearer
     * [1]Meu segundo array vai ser meu token 9219212919
     * Colocamos pra ignorar o primeiro array, com uma virgula, e depois passamos o conteudo do nosso token pra dentro
     * da variavel token
     */
    const [, token] = authHeader.split(' ');
    /**
     * Agora vamos verificar o token, usamos o próprio metodo verify do jsonwebtoken, ele espera dois argumentos
     * o primeiro que e o conteudo do nosso token e o segundo a nossa chave secreta
     */
    try {
        /**
         * Quanto a gente gerou o token, passamos o subject: e esse atributo recebeu o id do usuário
         * Agora estamos recuperando esse id e vamos fazer a comparação desse id com algum usuário no banco
         * criamos a interface Ipayload, passando o sub pq senão ela não reconhece, e renomeamos o sub pra user_id
         */
        const { secret_token } = auth;
        const { sub: user_id } = verify(token, secret_token) as IPayload;

        request.user = {
            id: user_id,
        };

        next();
    } catch (error) {
        throw new AppError('Invalid Token', 401);
    }
}
