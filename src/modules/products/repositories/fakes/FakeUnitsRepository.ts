import { uuid } from 'uuidv4';

import ICreateUnitDTO from '@modules/products/dtos/ICreateUnitDTO';
import Unit from '@modules/products/infra/typeorm/entities/Unit';
import IUnitRepository from '../IUnitsRepository';

class FakeUnitsRepository implements IUnitRepository {
  private units: Unit[] = [];

  public async findById(id: string): Promise<Unit | undefined> {
    const findUnit = this.units.find(unit => unit.id === id);

    return findUnit;
  }

  public async findByName(name: string): Promise<Unit | undefined> {
    const findUnit = this.units.find(unit => unit.name === name);

    return findUnit;
  }

  public async findByAbreviation(
    abreviation: string,
  ): Promise<Unit | undefined> {
    const findUnit = this.units.find(unit => unit.abreviation === abreviation);

    return findUnit;
  }

  public async findAll(): Promise<Unit[] | undefined> {
    return this.units;
  }

  public async create(data: ICreateUnitDTO): Promise<Unit> {
    const unit = new Unit();

    unit.id = uuid();
    unit.name = data.name;
    unit.abreviation = data.abreviation;

    this.units.push(unit);
    return unit;
  }

  public async save(unit: Unit): Promise<Unit> {
    const findIndex = this.units.findIndex(findUnit => findUnit.id === unit.id);

    this.units[findIndex] = unit;
    return unit;
  }
}

export default FakeUnitsRepository;
