import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';
import Group from '@modules/products/infra/typeorm/entities/IngredientGroup';
import IIngredientGroupRepository from '@modules/products/repositories/IIngredientGroupsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  description: string;
}

@injectable()
class CreateIngredientGroupService {
  constructor(
    @inject('GroupsRepository')
    private groupsRepository: IIngredientGroupRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ description }: IRequest): Promise<Group> {
    const checkGroupExists = await this.groupsRepository.findByDescription(
      description,
    );

    if (checkGroupExists) {
      throw new AppError('Este Grupo já está cadastrado!');
    }

    const group = await this.groupsRepository.create({
      description,
    });

    return group;
  }
}

export default CreateIngredientGroupService;
