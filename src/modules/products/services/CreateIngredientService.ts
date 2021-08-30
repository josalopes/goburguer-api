import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';
import Ingredient from '@modules/products/infra/typeorm/entities/Ingredient';
import IIngredientsRepository from '@modules/products/repositories/IIngredientsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  name: string;
  purchasePrice: number;
  unitPrice: number;
}

@injectable()
class CreateIngredientService {
  constructor(
    @inject('IngredientsRepository')
    private ingredientsRepository: IIngredientsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    name,
    purchasePrice,
    unitPrice,
  }: IRequest): Promise<Ingredient> {
    const checkIngredientExists = await this.ingredientsRepository.findByName(
      name,
    );

    if (checkIngredientExists) {
      throw new AppError('Este Ingredient já está cadastrado!');
    }

    const ingredient = await this.ingredientsRepository.create({
      name,
      purchasePrice,
      unitPrice,
    });

    return ingredient;
  }
}

export default CreateIngredientService;
