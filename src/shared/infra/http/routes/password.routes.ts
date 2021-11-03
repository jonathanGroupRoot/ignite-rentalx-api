import { Router } from 'express';

import { ResetPasswordUserController } from '@modules/accounts/useCases/resetPasswordUser/ResetPasswordUserController';
import { SendForgotPasswordMailController } from '@modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController';

const passwordRoutes = Router();
const sendMailController = new SendForgotPasswordMailController();
const resetPasswordController = new ResetPasswordUserController();

passwordRoutes.post('/forgot', sendMailController.handle);
passwordRoutes.post('/reset', resetPasswordController.handle);

export { passwordRoutes };
