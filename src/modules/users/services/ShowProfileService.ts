/* eslint-disable @typescript-eslint/no-unused-vars */
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';
import IUserRepository from '@modules/users/repositories/IUsersRepository';

import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
}

@injectable()
class ShowProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('Usuário não encontrado.');
    }

    return user;
  }
}

export default ShowProfileService;
