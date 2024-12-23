/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Role } from './schema/role.schema';
import { Model } from 'mongoose';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role.name) private roleModel: Model<Role>) { }
  async create(createRoleDto: CreateRoleDto) {
    const isExist = await this.roleModel.findOne({
      title: createRoleDto.title,
      isDeleted: false
    });
    if (isExist) {
      throw new BadRequestException("Nhóm quyền này đã tồn tại");
    }
    const createdRole = await this.roleModel.create({
      ...createRoleDto,
      isActive: true,
      isDeleted: false,
    });
    return createdRole;
  }

  async findAll() {
    return await this.roleModel.find({
      isDeleted: false
    });
  }

  async findOne(id: string) {
    const role = await this.roleModel.findOne({ _id: id })
    if (!role) {
      throw new BadRequestException("Không tìm thấy nhóm quyền")
    }
    return role
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    const isExist = await this.roleModel.findOne({
      title: updateRoleDto.title,
      _id: { $ne: id },
      isDeleted: false
    })
    if (isExist) {
      throw new BadRequestException("Nhóm quyền này đã tồn tại")
    }
    return await this.roleModel.updateOne({
      _id: id
    }, {
      ...updateRoleDto
    })
  }

  async remove(id: string) {
    return await this.roleModel.updateOne({ _id: id }, { isDeleted: true })
  }

  async addPermission(data: UpdateRoleDto) {
    try {
      for (const item in data) {
        const permissions = [];
        const title = item
        for (const key in data[item]) {
          const permission = key
          const checked = data[item][key]
          if (checked) {
            permissions.push(permission)
          }
        }
        await this.roleModel.updateOne({ title }, { permissions: permissions })
      }
      return "Thêm quyền vào nhóm quyền thành công"
    } catch (error) {
      console.log(error.message);
    }
  }
}
