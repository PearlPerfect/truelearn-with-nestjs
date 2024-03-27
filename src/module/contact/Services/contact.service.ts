import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Contact } from "../models/contact.model";
import mongoose from "mongoose";
import { SendMessageDto } from "../schemas/dtos/sendMessage.dto";
import { ContactResponse } from "../schemas/entities/contact.entity";


@Injectable()
export class ContactService {
  constructor(  @InjectModel(Contact.name) private contactModel: mongoose.Model<Contact>,){}

  async getAllContacts():Promise<any>{
    await this.contactModel.find().then((data) =>{
        console.log(data)
    })
  }

  async sendMessage(DTO: SendMessageDto): Promise<ContactResponse>{
    return this.contactModel.create(DTO).then((newUser) => {

        const response:ContactResponse = {
        name: newUser.firstName + " " + newUser.lastName,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
        message: newUser.message
        }

        return response
    }
        )
  }
}