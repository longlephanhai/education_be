/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateDocDto } from './dto/create-doc.dto';
import { UpdateDocDto } from './dto/update-doc.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Doc } from './schema/doc.schema';
import { Model } from 'mongoose';

@Injectable()
export class DocService {
  constructor(@InjectModel(Doc.name) private docModel: Model<Doc>) { }
  async create(createDocDto: CreateDocDto, file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('no file uploaded');
    }
    // validate file type
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException('File không hợp định dạng!');
    }

    // validate file size (e.g., max 5mb)
    const maxSize = 500 * 1024 * 1024;
    if (file.size > maxSize) {
      throw new BadRequestException('File quá lớn!');
    }
    const filePath = file.path.replace(/\\/g, '/').replace(/ /g, '%20');
    const newFile = await this.docModel.create({
      ...createDocDto,
      file: filePath,
    })
    return newFile;
  }

  async findAll() {
    return await this.docModel.find()
  }

  async findOne(id: string) {
    return await this.docModel.findById(id)
  }

  update(id: number, updateDocDto: UpdateDocDto) {
    return `This action updates a #${id} doc`;
  }

  async remove(id: string) {
    return await this.docModel.findByIdAndDelete(id);
  }
}
