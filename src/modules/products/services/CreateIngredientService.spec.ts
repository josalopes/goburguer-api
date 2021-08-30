import AppError from '@shared/errors/AppErrors';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeIngredientsRepository from '../repositories/fakes/FakeIngredientsRepository';
import CreateIngredientService from './CreateIngredientService';

let fakeIngredientsRepository: FakeIngredientsRepository;
let fakeCacheProvider: FakeCacheProvider;
let createIngredient: CreateIngredientService;

describe('CreateIngredient', () => {
  beforeEach(() => {
    fakeIngredientsRepository = new FakeIngredientsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    createIngredient = new CreateIngredientService(
      fakeIngredientsRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new Ingredient', async () => {
    const ingredient = await createIngredient.execute({
      name: 'Carnes',
      purchasePrice: 100.0,
      unitPrice: 10.0,
    });

    expect(ingredient).toHaveProperty('id');
  });

  it('should not be able to create a new Ingredient with a name already used by another', async () => {
    await createIngredient.execute({
      name: 'Priquito',
      purchasePrice: 100.0,
      unitPrice: 10.0,
    });

    await expect(
      createIngredient.execute({
        name: 'Priquito',
        purchasePrice: 100.0,
        unitPrice: 10.0,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
