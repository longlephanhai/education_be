/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ResponseMessage } from 'src/decorator/customize.decorator';


@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) { }

  @Post()
  @ResponseMessage("Tạo nhóm quyền thành công")
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  @ResponseMessage("Lấy danh sách nhóm quyền thành công")
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  @ResponseMessage("Lấy thông tin nhóm quyền thành công")
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(id);
  }

  @Patch(':id')
  @ResponseMessage("Cập nhật nhóm quyền thành công")
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(id, updateRoleDto);
  }

  @Delete(':id')
  @ResponseMessage("Xóa nhóm quyền thành công")
  remove(@Param('id') id: string) {
    return this.rolesService.remove(id);
  }

  @Post('permission')
  @ResponseMessage("Cập nhật phân quyền thành công")
  addPermission(@Body() data) {
    return this.rolesService.addPermission(data);
  }
}
