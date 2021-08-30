import { getRepository, Repository } from 'typeorm';

import IUnitsRepository from '@modules/products/repositories/IUnitsRepository';
import ICreateUnitDTO from '@modules/products/dtos/ICreateUnitDTO';

import Unit from '@modules/products/infra/typeorm/entities/Unit';

class UnitsRepository implements IUnitsRepository {
  private ormRepository: Repository<Unit>;

  constructor() {
    this.ormRepository = getRepository(Unit);
  }

  public async findAll(): Promise<Unit[]> {
    let units: Unit[];

    // eslint-disable-next-line prefer-const
    units = await this.ormRepository.find();

    return units;
  }

  public async findById(id: string): Promise<Unit | undefined> {
    const findUnit = await this.ormRepository.findOne(id);
    return findUnit;
  }

  public async findByName(name: string): Promise<Unit | undefined> {
    const findUnit = await this.ormRepository.findOne({
      where: { name },
    });
    return findUnit;
  }

  public async findByAbreviation(
    abreviation: string,
  ): Promise<Unit | undefined> {
    const findUnit = await this.ormRepository.findOne({
      where: { abreviation },
    });
    return findUnit;
  }

  public async create({ name, abreviation }: ICreateUnitDTO): Promise<Unit> {
    const unit = this.ormRepository.create({ name, abreviation });

    await this.ormRepository.save(unit);

    return unit;
  }

  public async save(unit: Unit): Promise<Unit> {
    return this.ormRepository.save(unit);
  }
}

export default UnitsRepository;
