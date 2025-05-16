/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { ChangePasswordDto, CodeAuthDto, CreateAuthDto } from 'src/auth/dto/create-auth.dtd.';
import aqp from 'api-query-params';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name)
  private userModel: Model<User>,
    private cloudinary: CloudinaryService,
    private readonly mailerService: MailerService
  ) { }

  hashPassword = async (password: string) => {
    return await bcrypt.hash(password, 10);
  }

  async create(createUserDto: CreateUserDto) {
    const isExit = await this.userModel.findOne({ email: createUserDto.email });
    if (isExit) {
      throw new BadRequestException('Email đã tồn tại');
    }
    createUserDto.password = await this.hashPassword(createUserDto.password);
    const user = await this.userModel.create(createUserDto);
    return {
      _id: user._id
    }
  }

  async findAll(currentPage: number, limit: number, qs: string) {
    const { filter, sort, projection, population = [] } = aqp(qs);
    population.push({ path: 'role', select: 'title' });
    delete filter.current;
    delete filter.pageSize;
    let offset = (+currentPage - 1) * (+limit);
    let defaultLimit = +limit ? +limit : 5;
    const totalItems = (await this.userModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / defaultLimit);
    const result = await this.userModel.find({
      ...filter,
      // role: { $ne: null },
      isDeleted: false
    })
      .skip(offset)
      .limit(defaultLimit)
      .sort(sort as any)
      .select('-password')
      .populate(population)
      .exec()

    return {
      meta: {
        current: currentPage,
        pageSize: limit,
        pages: totalPages,
        total: totalItems
      },
      result //kết quả query
    }
  }

  async findOne(id: string) {
    return await this.userModel.findById(id).populate({ path: 'role', select: 'title' });
  }

  async update(id: string, updateUserDto: any, avatar: Express.Multer.File) {
    const emailExist = await this.userModel.findOne({
      email: updateUserDto.email,
      _id: { $ne: id },
      isDeleted: false
    })
    if (updateUserDto.status) {
      if (updateUserDto.status === "active") {
        updateUserDto.isActive = true;
      } else {
        updateUserDto.isActive = false
      }
    }
    let avatarUrl = null;
    if (avatar) {
      avatarUrl = await this.uploadImageToCloudinary(avatar);
    }
    if (emailExist) {
      throw new BadRequestException('Email đã tồn tại');
    } else {
      if (updateUserDto.password) {
        updateUserDto.password = await this.hashPassword(updateUserDto.password);
      } else {
        delete updateUserDto.password;
      }
      await this.userModel.updateOne({ _id: id }, { ...updateUserDto, avatar: avatarUrl?.secure_url });
    }
    return {
      _id: id
    }
  }

  async remove(id: string) {
    await this.userModel.updateOne({
      _id: id
    }, {
      isDeleted: true
    })
  }

  async findByEmail(email: string) {
    return await this.userModel.findOne({ email })
  }


  async uploadImageToCloudinary(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file provided.');
    }
    return await this.cloudinary.uploadImage(file).catch(() => {
      throw new BadRequestException('Invalid file type.');
    });
  }


  async register(createUserDto: any, avatar: Express.Multer.File) {

    // check email
    const isExit = await this.userModel.findOne({ email: createUserDto.email });
    if (isExit) {
      throw new BadRequestException('Email đã tồn tại');
    }
    // hash password
    const hashPassword = await bcrypt.hash(createUserDto.password, 10);
    const codeId = uuidv4();
    let avatarUrl = null;
    if (avatar) {
      avatarUrl = await this.uploadImageToCloudinary(avatar);
    }
    let isActive = false;
    if (createUserDto.status === "active") {
      isActive = true;
    }
    const user = await this.userModel.create({
      ...createUserDto,
      password: hashPassword,
      avatar: avatarUrl?.secure_url || null,
      codeId: codeId,
      isActive: isActive,
      codeExpired: dayjs().add(5, 'minutes'),
      isDeleted: false
    })
    // send email
    this.mailerService.sendMail({
      to: user.email, // list of receivers
      subject: 'Activate your account at @Long', // Subject line
      template: "register",
      context: {
        name: user?.name ?? user.email,
        activationCode: codeId
      }
    })
    return {
      _id: user._id
    }
  }

  async handleActive(data: CodeAuthDto) {
    const user = await this.userModel.findOne({
      codeId: data.code,
      _id: data._id,
    });
    if (!user) {
      throw new BadRequestException("Code không đúng hoặc đã hết hạn");
    }
    // check expire code
    const isBeforeCheck = dayjs().isBefore(user.codeExpired);
    if (isBeforeCheck) {
      await this.userModel.updateOne({ _id: data._id }, { isActive: true });
    } else {
      throw new BadRequestException("Code đã hết hạn");
    }
    return { isBeforeCheck }
  }

  async retryActive(email: string) {
    // check email
    const user = await this.userModel.findOne({ email })
    if (!user) {
      throw new BadRequestException(`Email không tồn tại: ${email}`)
    }
    if (user.isActive) {
      throw new BadRequestException(`Tài khoản đã được kích hoạt: ${email}`)
    }
    // send email
    const codeId = uuidv4();
    await this.userModel.updateOne({ email }, {
      codeId: codeId,
      codeExpired: dayjs().add(5, 'minutes')
    })
    this.mailerService.sendMail({
      to: user.email, // list of receivers
      subject: 'Activate your account at @Long', // Subject line
      template: "register",
      context: {
        name: user?.name ?? user.email,
        activationCode: codeId
      }
    })
    return { _id: user._id }
  }

  async retryPassword(email: string) {
    // check email
    const user = await this.userModel.findOne({ email })
    if (!user) {
      throw new BadRequestException(`Email không tồn tại: ${email}`)
    }

    // send email
    const codeId = uuidv4();
    await this.userModel.updateOne({ email }, {
      codeId: codeId,
      codeExpired: dayjs().add(5, 'minutes')
    })
    this.mailerService.sendMail({
      to: user.email, // list of receivers
      subject: 'Change your password account at @Long', // Subject line
      template: "register",
      context: {
        name: user?.name ?? user.email,
        activationCode: codeId
      }
    })
    return { _id: user._id, email: user.email }
  }

  async changePassword(data: ChangePasswordDto) {
    if (data.password !== data.confirmPassword) {
      throw new BadRequestException("Mật khẩu không khớp")
    }
    // check email
    const user = await this.userModel.findOne({ email: data.email })
    if (!user) {
      throw new BadRequestException(`Email không tồn tại`)
    }
    // check expire code
    const isBeforeCheck = dayjs().isBefore(user.codeExpired);
    if (isBeforeCheck) {
      const newPassword = await bcrypt.hash(data.password, 10);
      await this.userModel.updateOne({ email: data.email }, { password: newPassword });
    } else {
      throw new BadRequestException("Code đã hết hạn");
    }

    return { _id: user._id, email: user.email }
  }

  async getRole(user: any) {
    return (await this.userModel.findById(user.userId)
      .populate({ path: 'role', select: 'permissions' })
      .select('role')).role;
  }

  async getProfile(user: any) {
    return await this.userModel.findById(user.userId).select('-password');
  }

  async loginGoogle(user: any) {
    const userGoogle = await this.userModel.findOne({ email: user.email });
    if (!userGoogle) {
      const newUser = await this.userModel.create({
        email: user.email,
        name: user.lastName + ' ' + user.firstName,
        avatar: user.picture,
        isActive: true,
        isDeleted: false,
        password: await bcrypt.hash(user.accessToken, 10),
        isGoogle: true
      })
      return newUser
    } else {
      return userGoogle
    }
  }
}
