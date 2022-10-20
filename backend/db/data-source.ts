import { DataSource, DataSourceOptions } from 'typeorm';
import configuration from '../config/configuration';
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  ...configuration(),
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/**.js'],
  ssl: true,
  extra: {
    max: 2,
  },
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
