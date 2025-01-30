
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { SkipAuth } from './constants';
import {CreateUserDto} from '../users/users.entity'
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOperation, ApiProperty } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

@ApiOperation({summary:'Create a New Account'})
@ApiCreatedResponse({
  description: 'User registered successfully'
})
@ApiBadRequestResponse({
  description: 'Username doesn t respect the rules'
})
  @SkipAuth()
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<{ message: string }> {
    return this.authService.register(createUserDto.username, createUserDto.password);
  }

  @ApiOperation({summary:'Login with the account'})
  @ApiCreatedResponse({
    description: 'Access token (number)'
  })
  @ApiBadRequestResponse({
    description: 'Error: Invalid username or password'
  })
  @SkipAuth()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @ApiOperation({summary:'Get a user profile'})
  @ApiCreatedResponse({
    description: 'Access_token:number'
  })
  @ApiBadRequestResponse({
    description: 'Error: User not found'
  })
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
