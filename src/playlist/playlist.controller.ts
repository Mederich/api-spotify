import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreatePlaylistDto, GetPlaylistDto } from './playlist.entity';
import { PlaylistService } from './playlist.service';
import { profile } from 'console';
import { User } from 'src/users/users.entity';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { Music } from 'src/music/music.entity';

@Controller('playlist')
export class PlaylistController {
  constructor(
    private readonly playlistService: PlaylistService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: 'Create playlist' })
  @ApiCreatedResponse({
    description: 'Playlist has been created',
  })
  @ApiBadRequestResponse({
    description: 'Error: the playlist name is not a string',
  })
  @Post('createplaylist')
  async createplaylist(
    @Headers('authorization') jwtHeader: string,
    @Body() CreatePlaylistDto: CreatePlaylistDto,
  ): Promise<any> {
    console.log('Got jwt header:', jwtHeader);
    const token = await this.authService.extractToken(jwtHeader);

    console.log('Got token:', token);

    if (token === undefined) throw new Error('jwt token is missing');

    const val = await this.authService.decodeToken(token);

    console.log('got decoded:', val);

    return this.playlistService.createPlaylist(CreatePlaylistDto, val.userId);
  }

  @ApiOperation({ summary: 'Get all Playlists of a user' })
  @ApiCreatedResponse({
    description: 'a list of all playlist along with their musics',
  })
  @ApiBadRequestResponse({
    description: 'Error: No playlist found',
  })
  @Get('listplaylists')
  async getPlaylist(
    @Headers('authorization') jwtHeader: string,
    @Body() getPlaylistDto: GetPlaylistDto,
  ): Promise<any> {
    const token = await this.authService.extractToken(jwtHeader);
    if (token === undefined) throw new Error('jwt token is missing');
    const { userId } = await this.authService.decodeToken(token);

    return this.playlistService.getAllPlaylists(userId, getPlaylistDto.id);
  }

  @ApiOperation({ summary: 'Create playlist' })
  @ApiCreatedResponse({
    description: 'Playlist successfully deleted',
  })
  @ApiBadRequestResponse({
    description: 'Error: in the request body ',
  })
  @Delete('deleteplaylist')
  async deletePlaylist(
    @Headers('authorization') jwtHeader: string,
    @Body() getPlaylistDto: GetPlaylistDto,
  ): Promise<any> {
    // Extraire le token JWT
    const token = await this.authService.extractToken(jwtHeader);
    if (token === undefined) throw new Error('JWT token is missing');

    // Décoder le token pour obtenir l'ID utilisateur
    const { userId } = await this.authService.decodeToken(token);

    // Appeler le service pour supprimer la playlist
    await this.playlistService.deletePlaylistById(userId, getPlaylistDto.id);

    return { message: 'Playlist successfully deleted' };
  }

  @Get('filter/:playlistId')
  async filterPlaylistByMusicName(
    @Headers('authorization') jwtHeader: string,
    @Query('genre') genre: string,
    @Param('playlistId') playlistId: number,
  ): Promise<any> {
    try {
      const token = await this.authService.extractToken(jwtHeader);
      if (token === undefined) throw new Error('jwt token is missing');
      const { userId } = await this.authService.decodeToken(token);

      const filteredPlaylist = await this.playlistService.filterPlaylistByGenre(
        userId,
        playlistId,
        genre,
      );
      return { filteredPlaylist: filteredPlaylist };
    } catch (error) {
      return { message: error.message };
    }
  }
}
