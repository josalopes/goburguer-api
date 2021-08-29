import ICreateUnitDTO from '@modules/products/dtos/ICreateUnitDTO';
import Unit from '@modules/products/infra/typeorm/entities/Unit';

export default interface IUnitRepository {
  findById(id: string): Promise<Unit | undefined>;
  findByName(name: string): Promise<Unit | undefined>;
  findByAbreviation(abreviation: string): Promise<Unit | undefined>;
  findAll(): Promise<Unit[] | undefined>;
  create(data: ICreateUnitDTO): Promise<Unit>;
  save(unit: Unit): Promise<Unit>;
}
