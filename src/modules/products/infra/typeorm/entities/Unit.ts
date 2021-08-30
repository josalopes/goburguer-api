import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import Ingredient from './Ingredient';

@Entity('ingredient_group')
class Unit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  abreviation: string;

  @OneToMany(() => Ingredient, ingredient => ingredient.unit)
  ingredients: Ingredient[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  update_at: Date;
}

export default Unit;
