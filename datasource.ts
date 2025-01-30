import { DataSource } from 'typeorm';
// import { Music } from './src/music/music.entity';
// import { Playlist } from './src/playlist/playlist.entity';
// import { User } from './src/users/user.entity';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'mydatabase.db',
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['**/migrations/*'],
  // entities: [Music, Playlist, User], // Or use a glob pattern: [__dirname + '/**/*.entity{.ts,.js}'],
  // migrations: ['dist/migrations/*.js'],
  synchronize: false, // Set to false in production
});
