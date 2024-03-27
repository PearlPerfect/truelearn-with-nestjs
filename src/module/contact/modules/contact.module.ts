import { Module } from '@nestjs/common';
import { Contact, ContactSchema } from '../models/contact.model';
import { MongooseModule } from '@nestjs/mongoose';
import { ContactController } from '../controllers/contact.controller';
import { ContactService } from '../Services/contact.service';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Contact.name, schema: ContactSchema }]),
  ],
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}
