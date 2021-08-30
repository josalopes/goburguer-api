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
  purchasePrice: number;

  @Column()
  unitPrice: number;

  @ManyToOne(() => IngredientGroup)
  @JoinColumn({ name: 'ingredient_group_id' })
  ingredientGroup: IngredientGroup;

  @ManyToOne(() => Unit)
  @JoinColumn({ name: 'unit_id' })
  unit: Unit;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  update_at: Date;
}

export default Ingredient;
