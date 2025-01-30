import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';
import { User } from '../users/users.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Music } from '../music/music.entity';

@Entity()
export class Playlist {
  @PrimaryGeneratedColumn()
  playlistId: number;

  @Column()
  playlistname: string;

  @ManyToOne(() => User, (user) => user.playlists, { onDelete: 'CASCADE' })
  user: User;

  constructor(playlistName: string, user: User) {
    this.playlistname = playlistName;
    this.user = user;
  }

  @ManyToMany(() => Music, (music: Music) => music.playlists, { cascade: true })
  @JoinTable()
  musics: Music[];
}

export class CreatePlaylistDto {
  @ApiProperty({
    description: 'The name of playlist',
    example: 'Playlist 1',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  playlistname: string;
}

export class GetPlaylistDto {
  @ApiProperty({
    description: 'The id of the playlist',
    example: '1',
  })
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
