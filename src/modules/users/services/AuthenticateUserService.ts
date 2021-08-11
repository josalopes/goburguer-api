/* eslint-disable no-console */
// import { getRepository, Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';

import IUserRepository from '@modules/users/repositories/IUsersRepository';
// import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import User from '@modules/users/infra/typeorm/entities/User';
// import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppErrors';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserService {
  // private userTokensRepository: Repository<UserToken>;

  constructor(
    // @inject('UsersTokensRepository')
    // private usersTokensRepository: IUserTokensRepository,

    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {
    // this.userTokensRepository = getRepository(UserToken);
  }

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );
    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    // this.userTokensRepository.create({
    //   token,
    //   user_id: user.id,
    // });

    // console.log(userToken);
    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
