import AppError from '@shared/errors/AppErrors';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const response = await authenticateUser.execute({
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existing user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await expect(
      authenticateUser.execute({
        email: 'johndoe@example.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

// import AppError from '@shared/errors/AppErrors';
// import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
// import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
// import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
// import CreateUserService from '@modules/users/services/CreateUserService';

// describe('AuthenticateUser', () => {
//   it('should be able to authenticate a user', async () => {
//     const fakeUsersRepository = new FakeUsersRepository();
//     const fakeHashProvider = new FakeHashProvider();

//     const createUser = new CreateUserService(
//       fakeUsersRepository,
//       fakeHashProvider,
//     );
//     const authenticateUser = new AuthenticateUserService(
//       fakeUsersRepository,
//       fakeHashProvider,
//     );

//     const user = await createUser.execute({
//       name: 'John Doe',
//       email: 'johndoe@example.com',
//       password: '123456',
//     });

//     const response = await authenticateUser.execute({
//       email: 'johndoe@example.com',
//       password: '123456',
//     });

//     expect(response).toHaveProperty('token');
//     expect(response.user).toEqual(user);
//   });

//   it('should not be able to authenticate with a no existing user', async () => {
//     const fakeUsersRepository = new FakeUsersRepository();
//     const fakeHashProvider = new FakeHashProvider();

//     const authenticateUser = new AuthenticateUserService(
//       fakeUsersRepository,
//       fakeHashProvider,
//     );

//     await expect(
//       authenticateUser.execute({
//         email: 'johndoe@example.com',
//         password: '123456',
//       }),
//     ).rejects.toBeInstanceOf(AppError);
//   });

//   it('should not be able to authenticate a user with a wrong password', async () => {
//     const fakeUsersRepository = new FakeUsersRepository();
//     const fakeHashProvider = new FakeHashProvider();

//     const createUser = new CreateUserService(
//       fakeUsersRepository,
//       fakeHashProvider,
//     );
//     const authenticateUser = new AuthenticateUserService(
//       fakeUsersRepository,
//       fakeHashProvider,
//     );

//     await createUser.execute({
//       name: 'John Doe',
//       email: 'johndoe@example.com',
//       password: '123456',
//     });

//     await expect(
//       authenticateUser.execute({
//         email: 'johndoe@example.com',
//         password: 'wrong-password',
//       }),
//     ).rejects.toBeInstanceOf(AppError);
//   });
// });
