import ICreateIngredientDTO from '@modules/products/dtos/ICreateIngredientDTO';
import Ingredient from '@modules/products/infra/typeorm/entities/Ingredient';

export default interface IIngredientGroupRepository {
  findById(id: string): Promise<Ingredient | undefined>;
  findByName(name: string): Promise<Ingredient | undefined>;
  findAll(): Promise<Ingredient[] | undefined>;
  create(data: ICreateIngredientDTO): Promise<Ingredient>;
  save(ingredient: Ingredient): Promise<Ingredient>;
}
