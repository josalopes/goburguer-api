import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import Unit from '@modules/products/infra/typeorm/entities/Unit';
import IngredientGroup from './IngredientGroup';

@Entity('ingredient')
class Ingredient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  precoCompra: number;

  @Column()
  precoUnitario: number;

  @ManyToOne(() => IngredientGroup)
  @JoinColumn({ name: 'ingredient_group_id' })
  ingredientGroup: IngredientGroup;

  @Column()
  user_id: string;

  @ManyToOne(() => Unit)
  @JoinColumn({ name: 'unit_id' })
  unidade: Unit;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  update_at: Date;
}

export default Ingredient;
