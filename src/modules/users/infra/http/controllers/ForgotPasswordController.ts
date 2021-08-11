import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';

export default class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;
    // console.log(email);
    const sendForgotPasswordEmail = container.resolve(
      SendForgotPasswordEmailService,
    );
    await sendForgotPasswordEmail.execute({
      email,
      // email: "caione174@gmail.com",
    });

    return response.status(204).json();
  }
}
