import { getRepository, Repository } from 'typeorm';

import IIngredientGroupsRepository from '@modules/products/repositories/IIngredientGroupsRepository';
import ICreateIngredientGroupDTO from '@modules/products/dtos/ICreateIngredientGroupDTO';

import Group from '@modules/products/infra/typeorm/entities/IngredientGroup';

class IngredientGroupsRepository implements IIngredientGroupsRepository {
  private ormRepository: Repository<Group>;

  constructor() {
    this.ormRepository = getRepository(Group);
  }

  public async findAll(): Promise<Group[]> {
    let groups: Group[];

    // eslint-disable-next-line prefer-const
    groups = await this.ormRepository.find();

    return groups;
  }

  public async findById(id: string): Promise<Group | undefined> {
    const findGroup = await this.ormRepository.findOne(id);
    return findGroup;
  }

  public async findByDescription(
    description: string,
  ): Promise<Group | undefined> {
    const findGroup = await this.ormRepository.findOne({
      where: { description },
    });
    return findGroup;
  }

  public async create({
    description,
  }: ICreateIngredientGroupDTO): Promise<Group> {
    const group = this.ormRepository.create({ description });

    await this.ormRepository.save(group);

    return group;
  }

  public async save(group: Group): Promise<Group> {
    return this.ormRepository.save(group);
  }
}

export default IngredientGroupsRepository;
