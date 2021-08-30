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
class IngredientGroup {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @OneToMany(() => Ingredient, ingredient => ingredient.ingredientGroup)
  ingredients: Ingredient[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  update_at: Date;
}

export default IngredientGroup;
