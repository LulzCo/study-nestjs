import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from './board/board.module';
import { BoardRepository } from './board/board.repository';
import { TypeOrmExModule } from './board/typeorm-ex.module';
import { typeOrmConfig } from './configs/typeorm.config';

@Module({
  imports: [
    BoardModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmExModule.forCustomRepository([BoardRepository])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
