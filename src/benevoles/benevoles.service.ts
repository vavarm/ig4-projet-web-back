import { Injectable } from '@nestjs/common';
import { CreateBenevoleDto } from './dto/create-benevole.dto';
import { UpdateBenevoleDto } from './dto/update-benevole.dto';

@Injectable()
export class BenevolesService {
  create(createBenevoleDto: CreateBenevoleDto) {
    return 'This action adds a new benevole';
  }

  findAll() {
    return `This action returns all benevoles`;
  }

  findOne(id: number) {
    return `This action returns a #${id} benevole`;
  }

  update(id: number, updateBenevoleDto: UpdateBenevoleDto) {
    return `This action updates a #${id} benevole`;
  }

  remove(id: number) {
    return `This action removes a #${id} benevole`;
  }
}
