import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('conversion_unit')
class ConversionUnit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  unidadeCompra: string;

  @Column()
  unidadeConsumo: string;

  @Column()
  fatorConversao: number;

  @Column()
  operadorConversao: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  update_at: Date;
}

export default ConversionUnit;
