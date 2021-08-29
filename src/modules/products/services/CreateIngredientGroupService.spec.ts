import AppError from '@shared/errors/AppErrors';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeIngredientGroupsRepository from '../repositories/fakes/FakeIngredientGroupsRepository';
import CreateIngredientGroupService from './CreateIngredientGroupService';

let fakeIngredientGroupsRepository: FakeIngredientGroupsRepository;
let fakeCacheProvider: FakeCacheProvider;
let createIngredientGroup: CreateIngredientGroupService;

describe('CreateIngredientGroup', () => {
  beforeEach(() => {
    fakeIngredientGroupsRepository = new FakeIngredientGroupsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    createIngredientGroup = new CreateIngredientGroupService(
      fakeIngredientGroupsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new Ingredient Group', async () => {
    const group = await createIngredientGroup.execute({
      description: 'Carnes',
    });

    expect(group).toHaveProperty('id');
  });

  it('should not be able to create a new Ingredient Group with a description already used by another group', async () => {
    await createIngredientGroup.execute({
      description: 'Priquito',
    });

    await expect(
      createIngredientGroup.execute({
        description: 'Priquito',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
