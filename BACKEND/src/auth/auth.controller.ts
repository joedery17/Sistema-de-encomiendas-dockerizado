import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../usuario/usuario.entity';

@Controller('auth')
export class AuthController {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    const { username, password } = body;

    const usuario = await this.usuarioRepository.findOne({
      where: { nombreUsuario: username, password: password }
    });

    if (!usuario) {
      throw new UnauthorizedException('Usuario o contraseña incorrectos');
    }

    return {
      token: 'simple-token-' + Date.now(),
      user: {
        id: usuario.id,
        nombre_usuario: usuario.nombreUsuario,
        rol: usuario.rol
      }
    };
  }
}