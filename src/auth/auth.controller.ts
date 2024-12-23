/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Controller, Post, UseGuards, Request, Body, BadRequestException, UseInterceptors, UploadedFile, Get, Res, Response } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './passport/local-auth.guard';
import { Public, ResponseMessage, User } from 'src/decorator/customize.decorator';
import { ChangePasswordDto, CodeAuthDto, CreateAuthDto } from './dto/create-auth.dtd.';
import { FileInterceptor } from '@nestjs/platform-express';
import { GoogleOAuthGuard } from './passport/google-oauth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  @ResponseMessage('Đăng nhập thành công')
  @Public()
  @UseGuards(LocalAuthGuard)
  handleLogin(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  @ResponseMessage('Đăng ký thành công')
  @UseInterceptors(FileInterceptor('avatar'))
  @Public()
  async handleRegister(@UploadedFile() avatar: Express.Multer.File, @Body() resgisterDto: any) {
    if (!avatar) {
      avatar = null
    }
    return this.authService.register(resgisterDto, avatar);
  }

  @Post('check-code')
  @ResponseMessage("Kích hoạt tài khoản thành công")
  @Public()
  checkCode(@Body() codeAuthDto: CodeAuthDto) {
    return this.authService.checkCode(codeAuthDto);
  }

  @Post('retry-active')
  @ResponseMessage("Gửi lại mã kích hoạt thành công")
  @Public()
  retryActive(@Body("email") email: string) {
    return this.authService.retryActive(email);
  }

  @Post('retry-password')
  @ResponseMessage("Gửi email thành công")
  @Public()
  retryPassword(@Body("email") email: string) {
    return this.authService.retryPassword(email);
  }

  @Post('change-password')
  @ResponseMessage("Đổi mật khẩu thành công")
  @Public()
  changePassword(@Body() data: ChangePasswordDto) {
    return this.authService.changePassword(data);
  }

  @Get('role')
  @ResponseMessage("Lấy role thành công")
  getRole(@User() user) {
    return this.authService.getRole(user);
  }

  @Get('profile')
  @ResponseMessage("Lấy thông tin thành công")
  getProfile(@User() user) {
    return this.authService.getProfile(user);
  }

  @Get()
  @Public()
  @UseGuards(GoogleOAuthGuard)
  async googleAuth(@Request() req) { }

  @Get('google-redirect')
  @Public()
  @ResponseMessage("Đăng nhập google thành công")
  @UseGuards(GoogleOAuthGuard)
  googleAuthRedirect(@Request() req,@Response() res) {
    return this.authService.googleLogin(req,res);
  }
}
