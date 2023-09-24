import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity({ name: 'Supplier' })
export class Supplier {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar' })
  name: string
}
