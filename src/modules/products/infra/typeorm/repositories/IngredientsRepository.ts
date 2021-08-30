import { getRepository, Repository } from 'typeorm';

import IIngredientsRepository from '@modules/products/repositories/IIngredientsRepository';
import ICreateIngredientDTO from '@modules/products/dtos/ICreateIngredientDTO';

import Ingredient from '@modules/products/infra/typeorm/entities/Ingredient';

class IngredientsRepository implements IIngredientsRepository {
  private ormRepository: Repository<Ingredient>;

  constructor() {
    this.ormRepository = getRepository(Ingredient);
  }

  public async findAll(): Promise<Ingredient[]> {
    let ingredients: Ingredient[];

    // eslint-disable-next-line prefer-const
    ingredients = await this.ormRepository.find();

    return ingredients;
  }

  public async findById(id: string): Promise<Ingredient | undefined> {
    const findIngredient = await this.ormRepository.findOne(id);
    return findIngredient;
  }

  public async findByName(name: string): Promise<Ingredient | undefined> {
    const findIngredient = await this.ormRepository.findOne({
      where: { name },
    });
    return findIngredient;
  }

  public async create({
    name,
    purchasePrice,
    unitPrice,
  }: ICreateIngredientDTO): Promise<Ingredient> {
    const group = this.ormRepository.create({ name, purchasePrice, unitPrice });

    await this.ormRepository.save(group);

    return group;
  }

  public async save(ingredient: Ingredient): Promise<Ingredient> {
    return this.ormRepository.save(ingredient);
  }
}

export default IngredientsRepository;
