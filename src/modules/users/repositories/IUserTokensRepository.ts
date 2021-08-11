import UserToken from '@modules/users/infra/typeorm/entities/UserToken';
// import ICreateUserTokenDTO from '../dtos/ICreateUserTokenDTO';

export default interface IUserTokenRepository {
  generate(user_id: string): Promise<UserToken>;
  // save(userToken: UserToken): Promise<void>;
  findByToken(token: string): Promise<UserToken | undefined>;
  // create(data: ICreateUserTokenDTO): Promise<UserToken>;
}
