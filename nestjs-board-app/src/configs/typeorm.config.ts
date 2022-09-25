import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'seongwon',
    password: '1234',
    database: 'BoardProject',
    entities: [__dirname + '/../**/*.entity..{js, ts}'],
    synchronize: true,
}