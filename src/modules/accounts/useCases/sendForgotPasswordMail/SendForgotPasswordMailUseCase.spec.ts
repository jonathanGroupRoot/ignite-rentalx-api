import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { UsersTokenRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokenRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { MailProviderInMemory } from '@shared/container/providers/MailProvider/in-memory/MailProviderInMemory';
import { AppError } from '@shared/errors/AppError';

import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokenRepositoryInMemory: UsersTokenRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let mailProvider: MailProviderInMemory;

describe('send forgot mail', () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        mailProvider = new MailProviderInMemory();
        dateProvider = new DayjsDateProvider();
        usersTokenRepositoryInMemory = new UsersTokenRepositoryInMemory();

        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
            usersRepositoryInMemory,
            usersTokenRepositoryInMemory,
            dateProvider,
            mailProvider,
        );
    });

    it('should be able to send a forgot password mail to user', async () => {
        const sendMail = jest.spyOn(mailProvider, 'sendMail');

        await usersRepositoryInMemory.create({
            name: 'jonathan',
            driver_license: '5454',
            email: 'asaw@.com',
            password: '21212',
        });

        await sendForgotPasswordMailUseCase.execute('asaw@.com');

        expect(sendMail).toHaveBeenCalled();
    });

    it('should not be able to send an email if user does not exists', async () => {
        await expect(
            sendForgotPasswordMailUseCase.execute('cssdd'),
        ).rejects.toEqual(new AppError('User does not exists'));
    });

    it('should be able to create an users token', async () => {
        const generateTokenMail = jest.spyOn(
            usersTokenRepositoryInMemory,
            'create',
        );

        await usersRepositoryInMemory.create({
            name: 'jonathans',
            driver_license: '545s4',
            email: 'asassw@.com',
            password: '2121232',
        });

        await sendForgotPasswordMailUseCase.execute('asassw@.com');

        expect(generateTokenMail).toBeCalled();
    });
});
