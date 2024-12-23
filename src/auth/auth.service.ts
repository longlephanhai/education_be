/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { ChangePasswordDto, CodeAuthDto, CreateAuthDto } from './dto/create-auth.dtd.';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) { }
  comparePassword = async (password: string, hash: string) => {
    return await bcrypt.compare(password, hash);
  }
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(username);
    if (!user) {
      return null;
    }
    const isValid = await this.comparePassword(pass, user.password);
    if (!user || !isValid) {
      throw new UnauthorizedException('Tài khoản hoặc mật khẩu không đúng');
    }
    return user
  }

  async login(user: any) {
    const userLogin = await this.usersService.findByEmail(user.email);
    if (!userLogin) {
      throw new BadRequestException('Tài khoản hoặc mật khẩu không đúng');
    }
    if (!userLogin.isActive) {
      throw new BadRequestException('Tài khoản chưa được kích hoạt');
    }
    const payload = { username: user?.email, sub: user?._id, role: user.role ? user.role : null };
    return {
      user: {
        email: user.email,
        name: user.name,
        id: user._id
      },
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(registerDto: any, avatar: Express.Multer.File) {
    return await this.usersService.register(registerDto, avatar);
  }

  checkCode = async (data: CodeAuthDto) => {
    return await this.usersService.handleActive(data);
  }

  retryActive = async (email: string) => {
    return await this.usersService.retryActive(email);
  }

  retryPassword = async (email: string) => {
    return await this.usersService.retryPassword(email);
  }

  changePassword = async (data: ChangePasswordDto) => {
    return await this.usersService.changePassword(data);
  }

  async getRole(user: any) {
    return this.usersService.getRole(user);
  }

  async getProfile(user: any) {
    return this.usersService.getProfile(user);
  }

  async googleLogin(req, res) {
    if (!req.user) {
      throw new BadRequestException('Không có người dùng từ google');
    }
    const user = req.user
    if (user) {
      const newUser = await this.usersService.loginGoogle(user);
      const payload = { user: user.email, sub: newUser?._id, role: user.role ? user.role : null };
      const accessToken = this.jwtService.sign(payload)
      user.accessToken = accessToken;
      // return res.redirect(`http://localhost:3000/auth/login?token=${accessToken}`);
      return res.redirect(`${this.configService.get('FRONT_END_URL')}/auth/login?token=${accessToken}`);
    }
  }
}
