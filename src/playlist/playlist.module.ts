import { Module } from '@nestjs/common';
import { PlaylistController } from './playlist.controller';
import { PlaylistService } from './playlist.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Playlist } from './playlist.entity';
import { User } from 'src/users/users.entity';
import { AuthModule } from 'src/auth/auth.module';
import { Music } from 'src/music/music.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Playlist, Music, User]), AuthModule],
  controllers: [PlaylistController],
  providers: [PlaylistService],
  exports: [PlaylistService],
})
export class PlaylistModule {}
