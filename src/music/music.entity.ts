import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Playlist } from 'src/playlist/playlist.entity';

@Entity()
export class Music {
  @PrimaryGeneratedColumn()
  musicId: number;

  @Column()
  title: string;

  @Column()
  artiste: string;

  @Column()
  genre: string;

  @ManyToMany(() => Playlist, (playlist) => playlist.musics)
  playlists: Playlist[];

  constructor(music?: {
    musicId: number;
    title: string;
    artiste: string;
    genre: string;
  }) {
    if (!music) return;
    this.title = music.title;
    this.artiste = music.artiste;
    this.genre = music.genre;
  }
}

export class CreateMusicDto {
  @ApiProperty({
    description: 'The musicId',
    example: '1',
  })
  @IsNumber()
  @IsNotEmpty()
  musicId: number;

  @ApiProperty({
    description: 'The playlistId',
    example: '1',
  })
  @IsNumber()
  @IsNotEmpty()
  playlistId: number;

  constructor(
    music: {
      musicId: number;
      title: string;
      artiste: string;
      genre: string;
    },
    playlistId: number,
  ) {
    this.musicId = this.musicId;
    this.playlistId = playlistId;
  }
}
