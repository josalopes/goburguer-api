import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ingredient_group')
class IngredientGroup {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  descricao: string;

  @Column('timestamp with time zone')
  created_at: Date;

  @Column('timestamp with time zone')
  update_at: Date;
}

export default IngredientGroup;
