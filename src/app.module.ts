import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/users.entity';
import { PlaylistModule } from './playlist/playlist.module';
import { MusicService } from './music/music.service';
import { MusicController } from './music/music.controller';
import { MusicModule } from './music/music.module';
import { Music } from './music/music.entity';
import { Playlist } from './playlist/playlist.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'mydatabase.db', // Nom du fichier de la base de données SQLite
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Chemin vers tes entités
      synchronize: true,
      logger: 'advanced-console',
      logging: 'all',
      // autoLoadEntities: true,
    }),
    AuthModule,
    UsersModule,
    PlaylistModule,
    MusicModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
