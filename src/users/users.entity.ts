import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Playlist } from '../playlist/playlist.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Playlist, (playlist) => playlist.user)
  playlists: Playlist[];
}

export class CreateUserDto {
  @ApiProperty({
    description: 'The name of user',
    example: 'Jhon Doe',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'The password',
    example: 'passwd',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
