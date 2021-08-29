import { uuid } from 'uuidv4';

import ICreateIngredientGroupDTO from '@modules/products/dtos/ICreateIngredientGroupDTO';
import Group from '@modules/products/infra/typeorm/entities/IngredientGroup';
import IIngredientGroupRepository from '../IIngredientGroupsRepository';

class FakeIngredientGroupsRepository implements IIngredientGroupRepository {
  private groups: Group[] = [];

  public async findById(id: string): Promise<Group | undefined> {
    const findGroup = this.groups.find(group => group.id === id);

    return findGroup;
  }

  public async findByDescription(
    description: string,
  ): Promise<Group | undefined> {
    const findGroup = this.groups.find(
      group => group.description === description,
    );

    return findGroup;
  }

  public async findAll(): Promise<Group[] | undefined> {
    return this.groups;
  }

  public async create(data: ICreateIngredientGroupDTO): Promise<Group> {
    const group = new Group();

    group.id = uuid();
    group.description = data.description;

    this.groups.push(group);
    return group;
  }

  public async save(group: Group): Promise<Group> {
    const findIndex = this.groups.findIndex(
      findGroup => findGroup.id === group.id,
    );

    this.groups[findIndex] = group;
    return group;
  }
}

export default FakeIngredientGroupsRepository;
