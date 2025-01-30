import { Controller, Get, Param, Post, Headers, Body } from '@nestjs/common';
import { MusicService } from './music.service';
import { CreateMusicDto } from './music.entity';
import { AuthService } from '../auth/auth.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';

@Controller('music')
export class MusicController {
  constructor(
    private readonly musicService: MusicService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: 'Show Listmusic' })
  @ApiCreatedResponse({
    description: 'Respons Json',
  })
  @ApiBadRequestResponse({
    description: 'Error: Bad request body',
  })
  @Get('listmusic')
  getAllMusic() {
    return this.musicService.getAllMusic();
  }

  @ApiOperation({ summary: 'Add music in the playlist' })
  @ApiCreatedResponse({
    description: 'Music added to playlist successfully',
  })
  @ApiBadRequestResponse({
    description: 'Error: Bad request body',
  })
  @Post('add-music')
  async addMusicToPlaylist(
    @Headers('authorization') jwtHeader: string,
    @Body() createMusicDto: CreateMusicDto,
  ): Promise<any> {
    console.log('Got jwt header:', jwtHeader);
    const token = await this.authService.extractToken(jwtHeader);

    console.log('Got token:', token);

    if (token === undefined) throw new Error('jwt token is missing');

    const val = await this.authService.decodeToken(token);
    try {
      const updatedPlaylist = await this.musicService.addMusicToPlaylist(
        createMusicDto.musicId,
        createMusicDto.playlistId,
      );
      return {
        message: 'Music added to playlist successfully',
        updatedPlaylist,
      };
    } catch (error) {
      return { message: error.message };
    }
  }

  @ApiOperation({ summary: 'Generate musics' })
  @ApiCreatedResponse({
    description: 'The musics have already been created. Skipping',
  })
  @ApiBadRequestResponse({
    description: 'Error:',
  })
  @Post('generatemusics')
  async generateMusic(
    @Headers('authorization') jwtHeader: string,
  ): Promise<any> {
    const token = await this.authService.extractToken(jwtHeader);
    if (token === undefined) throw new Error('jwt token is missing');
    const { userId } = await this.authService.decodeToken(token);

    return this.musicService.generateMusicList();
  }
}
