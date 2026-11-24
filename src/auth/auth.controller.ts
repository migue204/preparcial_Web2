
import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  Public,
  TokenService,
} from '@nestjs/authentication';

import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(
    // Servicio que maneja el registro y login
    private readonly authService: AuthService,

    // Servicio que renueva y revoca los tokens
    private readonly tokenService: TokenService,
  ) {}

  // POST /auth/register: crea un usuario nuevo
  @Public()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  // POST /auth/login: verifica correo y contraseña
  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  // POST /auth/refresh: renueva los tokens
  @Public()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refresh(@Body() dto: RefreshTokenDto) {
    return this.tokenService.refresh(dto.refreshToken);
  }

  // POST /auth/logout: revoca el refresh token
  @Public()
  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@Body() dto: RefreshTokenDto) {
    await this.tokenService.revoke(dto.refreshToken);
  }
}
