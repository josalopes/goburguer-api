import { uuid } from 'uuidv4';

import ICreateIngredientDTO from '@modules/products/dtos/ICreateIngredientDTO';
import Ingredient from '@modules/products/infra/typeorm/entities/Ingredient';
import IIngredientsRepository from '../IIngredientsRepository';

class FakeIngredientsRepository implements IIngredientsRepository {
  private ingredients: Ingredient[] = [];

  public async findById(id: string): Promise<Ingredient | undefined> {
    const findIngredient = this.ingredients.find(
      ingredient => ingredient.id === id,
    );

    return findIngredient;
  }

  public async findByName(name: string): Promise<Ingredient | undefined> {
    const findIngredient = this.ingredients.find(
      ingredient => ingredient.name === name,
    );

    return findIngredient;
  }

  public async findAll(): Promise<Ingredient[] | undefined> {
    return this.ingredients;
  }

  public async create(data: ICreateIngredientDTO): Promise<Ingredient> {
    const ingredient = new Ingredient();

    ingredient.id = uuid();
    ingredient.name = data.name;
    ingredient.purchasePrice = data.purchasePrice;
    ingredient.unitPrice = data.unitPrice;

    this.ingredients.push(ingredient);
    return ingredient;
  }

  public async save(ingredient: Ingredient): Promise<Ingredient> {
    const findIndex = this.ingredients.findIndex(
      findIngredient => findIngredient.id === ingredient.id,
    );

    this.ingredients[findIndex] = ingredient;
    return ingredient;
  }
}

export default FakeIngredientsRepository;
