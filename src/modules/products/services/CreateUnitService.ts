import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppErrors';
import Unit from '@modules/products/infra/typeorm/entities/Unit';
import IUnitRepository from '@modules/products/repositories/IUnitsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  name: string;
  abreviation: string;
}

@injectable()
class CreateUnitService {
  constructor(
    @inject('UnitsRepository')
    private unitsRepository: IUnitRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ name, abreviation }: IRequest): Promise<Unit> {
    const checkUnitExists = await this.unitsRepository.findByName(name);

    if (checkUnitExists) {
      throw new AppError('Este Unidade já está cadastrada!');
    }

    const unit = await this.unitsRepository.create({ name, abreviation });

    return unit;
  }
}

export default CreateUnitService;
