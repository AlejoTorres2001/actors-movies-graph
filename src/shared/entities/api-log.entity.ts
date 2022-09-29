import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity({
  name: 'ApiLog',
})
export class ApiLog {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column()
  method: string;
  @Column()
  url: string;
  @Column()
  ip: string;
  @Column()
  hostName: string;
  @Column()
  statusCode: number;
  @Column()
  reqTransportLayerProtocol: string;
  @Column()
  reqBody: string;
  @Column()
  reqQuery: string;
  @Column()
  throughputTime: number;
  @Column()
  date: Date;
  @Column({ nullable: true })
  exceptionMessage?: string;
  @Column({ nullable: true })
  exceptionName?: string;
}
