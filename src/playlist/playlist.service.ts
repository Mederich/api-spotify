import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Playlist } from './playlist.entity';
import { User } from '../users/users.entity';
import { Music } from 'src/music/music.entity';

@Injectable()
export class PlaylistService {
  constructor(
    @InjectRepository(Playlist)
    private playlistRepository: Repository<Playlist>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createPlaylist(
    playlist: {
      playlistname: string;
    },
    userId: number,
  ): Promise<any> {
    if (typeof playlist.playlistname !== 'string') {
      throw new UnauthorizedException(
        'Error: the playlist name is not a string',
      );
    }

    const user = await this.userRepository.findOne({
      where: {
        userId: userId,
      },
    });

    const newPlaylist = new Playlist(playlist.playlistname, user);

    await this.playlistRepository.save(newPlaylist);
    return { message: 'Playlist has been created', playlist: playlist };
  }

  async findOneByPlaylistname(
    userId: number,
    playlistname: string,
  ): Promise<Playlist | undefined> {
    const user = await this.userRepository.findOneBy({ userId: userId });

    return this.playlistRepository.findOneBy({ playlistname, user: user });
  }

  async getAllPlaylists(
    userId: number,
    playlistId: number,
  ): Promise<Playlist[] | undefined> {
    const user = await this.userRepository.findOneBy({ userId: userId });

    return this.playlistRepository.find({
      where: {
        user: user,
        playlistId: playlistId,
      },
      relations: ['musics'], // Charger la relation avec les musiques
    });
  }

  async findAlluserPlaylists(userId: number): Promise<Playlist[] | undefined> {
    const user = await this.userRepository.findOneBy({ userId: userId });

    return this.playlistRepository.findBy({ user: user });
  }

  async deletePlaylistById(userId: number, playlistId: number): Promise<void> {
    const playlist = await this.playlistRepository.findOne({
      where: { playlistId, user: { userId } },
      relations: ['user'],
    });

    if (!playlist) {
      throw new Error('Playlist not found or does not belong to the user');
    }

    await this.playlistRepository.remove(playlist);
  }

  async filterPlaylistByGenre(
    userId: number,
    playlistId: number,
    genre: string,
  ): Promise<Music[]> {
    const user = await this.userRepository.findOneBy({ userId });

    // Charger la playlist avec ses musiques associées
    const playlist = await this.playlistRepository.findOne({
      where: { playlistId, user },
      relations: ['musics'], // Charger la relation avec les musiques
    });

    if (!playlist) {
      throw new Error(`Playlist with ID ${playlistId} not found`);
    }

    console.log('found musics:', playlist.musics);

    // Filtrer les musiques dans la playlist par nom
    const filteredMusics = playlist.musics.filter(
      (music) => music.genre.toLowerCase() === genre.toLowerCase(),
    );

    return filteredMusics;
  }
}
