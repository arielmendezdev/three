import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Contact } from 'src/database/models/contact.model';

@Injectable()
export class ContactsService {

  constructor(@InjectModel(Contact) private readonly modelContact: typeof Contact) {}

  async create(createContactDto: CreateContactDto) {
    const newContact = await this.modelContact.create(createContactDto)
    return newContact
  }

  async findAll() {
    const contacts = await this.modelContact.findAll();
    return contacts
  }

  findOne(id: number) {
    return `This action returns a #${id} contact`;
  }

  update(id: number, updateContactDto: UpdateContactDto) {
    return `This action updates a #${id} contact`;
  }

  remove(id: number) {
    return `This action removes a #${id} contact`;
  }
}
