import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'mydatabase.db', // Nom du fichier de la base de données SQLite
    entities: [], // Chemin vers tes entités
  }), AuthModule, UsersModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
