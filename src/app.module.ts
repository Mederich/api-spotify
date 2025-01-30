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
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: 3306,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true,
      logging: ['query', 'error', 'warn'],
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
