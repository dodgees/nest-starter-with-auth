import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { Public } from './auth/public-metadata';
import { UsersService } from './users/users.service';
import { Roles } from './auth/roles/roles.decorator';
import { Role } from './auth/roles/role.enum';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Public()
  @Post('register')
  register(@Request() req) {
    const { username, password } = req.body;
    return this.userService.create(username, password);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('profile')
  @Roles(Role.ADMIN)
  getProfile(@Request() req) {
    return req.user;
  }
}
