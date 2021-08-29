import ICreateIngredientGroupDTO from '@modules/products/dtos/ICreateIngredientGroupDTO';
import Group from '@modules/products/infra/typeorm/entities/IngredientGroup';

export default interface IIngredientGroupRepository {
  findById(id: string): Promise<Group | undefined>;
  findByDescription(description: string): Promise<Group | undefined>;
  findAll(): Promise<Group[] | undefined>;
  create(data: ICreateIngredientGroupDTO): Promise<Group>;
  save(group: Group): Promise<Group>;
}
