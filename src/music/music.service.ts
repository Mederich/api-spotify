import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Playlist } from '../playlist/playlist.entity';
import { Music } from './music.entity';

@Injectable()
export class MusicService {
  constructor(
    @InjectRepository(Music)
    private musicRepository: Repository<Music>,
    @InjectRepository(Playlist)
    private playlistRepository: Repository<Playlist>,
  ) {}

  listMusic = [
    {
      musicId: 1,
      title: 'Bohemian Rhapsody',
      artiste: 'Queen',
      genre: 'Rock',
    },
    {
      musicId: 2,
      title: 'Blinding Lights',
      artiste: 'The Weeknd',
      genre: 'Pop',
    },
    {
      musicId: 3,
      title: 'Smells Like Teen Spirit',
      artiste: 'Nirvana',
      genre: 'Grunge',
    },
    {
      musicId: 4,
      title: 'Shape of You',
      artiste: 'Ed Sheeran',
      genre: 'Pop',
    },
    {
      musicId: 5,
      title: 'Stairway to Heaven',
      artiste: 'Led Zeppelin',
      genre: 'Rock',
    },
    {
      musicId: 6,
      title: 'Rolling in the Deep',
      artiste: 'Adele',
      genre: 'Soul',
    },
    {
      musicId: 7,
      title: 'Hotel California',
      artiste: 'Eagles',
      genre: 'Rock',
    },
    {
      musicId: 8,
      title: 'Thriller',
      artiste: 'Michael Jackson',
      genre: 'Pop',
    },
    { musicId: 9, title: 'Hey Jude', artiste: 'The Beatles', genre: 'Rock' },
    { musicId: 10, title: 'Imagine', artiste: 'John Lennon', genre: 'Pop' },
    {
      musicId: 11,
      title: 'Someone Like You',
      artiste: 'Adele',
      genre: 'Soul',
    },
    { musicId: 12, title: 'Wonderwall', artiste: 'Oasis', genre: 'Rock' },
    { musicId: 13, title: 'Halo', artiste: 'Beyoncé', genre: 'R&B' },
    {
      musicId: 14,
      title: 'Billie Jean',
      artiste: 'Michael Jackson',
      genre: 'Pop',
    },
    {
      musicId: 15,
      title: 'Lose Yourself',
      artiste: 'Eminem',
      genre: 'Hip-Hop',
    },
    { musicId: 16, title: 'All of Me', artiste: 'John Legend', genre: 'R&B' },
    {
      musicId: 17,
      title: 'Rolling Stone',
      artiste: 'Bob Dylan',
      genre: 'Folk',
    },
    { musicId: 18, title: 'Poker Face', artiste: 'Lady Gaga', genre: 'Pop' },
    {
      musicId: 19,
      title: 'Uptown Funk',
      artiste: 'Bruno Mars',
      genre: 'Funk',
    },
    {
      musicId: 20,
      title: 'Boulevard of Broken Dreams',
      artiste: 'Green Day',
      genre: 'Rock',
    },
    {
      musicId: 21,
      title: 'Take Me to Church',
      artiste: 'Hozier',
      genre: 'Soul',
    },
    {
      musicId: 22,
      title: 'Shake It Off',
      artiste: 'Taylor Swift',
      genre: 'Pop',
    },
    {
      musicId: 23,
      title: 'Enter Sandman',
      artiste: 'Metallica',
      genre: 'Metal',
    },
    { musicId: 24, title: 'Let Her Go', artiste: 'Passenger', genre: 'Folk' },
    {
      musicId: 25,
      title: 'Bad Guy',
      artiste: 'Billie Eilish',
      genre: 'Electropop',
    },
    { musicId: 26, title: 'Chandelier', artiste: 'Sia', genre: 'Pop' },
  ];

  async generateMusicList(): Promise<Music[] | object> {
    const exists = await this.musicRepository.count();

    if (exists > 0) {
      return {
        message: 'The musics have already been created. Skipping',
      };
    }

    this.listMusic.forEach(async (music) => {
      const entity = new Music(music);
      await this.musicRepository.save(entity);
    });

    return this.getAllMusic();
  }

  async addMusicToPlaylist(
    musicId: number,
    playlistId: number,
  ): Promise<Playlist> {
    // Récupérer la musique par son ID
    const music = await this.musicRepository.findOneBy({ musicId: musicId });

    if (!music) {
      throw new Error(`Music with ID ${musicId} not found`);
    }

    console.log('TMP:', music);

    // Récupérer la playlist par son ID, en chargeant ses musiques associées
    const playlist = await this.playlistRepository.findOne({
      where: { playlistId },
      relations: ['musics'], // Charger la relation avec les musiques
    });

    if (!playlist) {
      throw new Error(`Playlist with ID ${playlistId} not found`);
    }

    // Vérifier si la musique n'est pas déjà dans la playlist
    const isMusicAlreadyInPlaylist = playlist.musics.some(
      (m) => m.musicId === musicId,
    );

    if (isMusicAlreadyInPlaylist) {
      throw new Error(`Music with ID ${musicId} is already in the playlist`);
    }

    playlist.musics.push(music);

    // Sauvegarder la playlist mise à jour
    return this.playlistRepository.save(playlist);
  }

  getAllMusic() {
    return this.musicRepository.find();
  }

  getMusicById(musicId: number) {
    return this.musicRepository.findOneBy({ musicId: musicId });
  }
}
