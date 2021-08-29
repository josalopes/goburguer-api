import AppError from '@shared/errors/AppErrors';

import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeUnitsRepository from '../repositories/fakes/FakeUnitsRepository';
import CreateUnitService from './CreateUnitService';

let fakeUnitsRepository: FakeUnitsRepository;
let fakeCacheProvider: FakeCacheProvider;
let createUnit: CreateUnitService;

describe('CreateIngredientGroup', () => {
  beforeEach(() => {
    fakeUnitsRepository = new FakeUnitsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    createUnit = new CreateUnitService(fakeUnitsRepository, fakeCacheProvider);
  });

  it('should be able to create a new Unit', async () => {
    const unit = await createUnit.execute({
      name: 'Kilo',
      abreviation: 'kg',
    });

    expect(unit).toHaveProperty('id');
  });

  it('should not be able to create a new Unit with a name and a abreviation already used by another unit', async () => {
    await createUnit.execute({
      name: 'Kilo',
      abreviation: 'kg',
    });

    await expect(
      createUnit.execute({
        name: 'Kilo',
        abreviation: 'kg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
