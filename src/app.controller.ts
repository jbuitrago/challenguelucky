import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { User, UsersService} from './users/users.service'
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
import * as bcrypt from 'bcrypt';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService, private readonly usersService: UsersService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    const usersInfo = await this.usersService.findInfo(req.user.userId);
    return usersInfo;
  }

  @Post('register')
  async postRegister(@Body() body: User){
    const saltOrRounds = 12;
    const hashPassword = await bcrypt.hash(body.password, saltOrRounds);
    return this.usersService.create(body.username,hashPassword,body.name,body.cityId,body.address);
  }
}
