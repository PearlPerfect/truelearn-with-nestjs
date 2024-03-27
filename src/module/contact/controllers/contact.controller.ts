import { Controller, Post, Body} from '@nestjs/common';
  import { ApiTags } from '@nestjs/swagger';
import { ContactService } from '../Services/contact.service';
import { SendMessageDto } from '../schemas/dtos/sendMessage.dto';
import { ContactResponse } from '../schemas/entities/contact.entity';
  
  @ApiTags('contact')
  @Controller('')
  export class ContactController {
    constructor(private contactService: ContactService) {}

    @Post()
    sendMessage(@Body() DTO:SendMessageDto):Promise<ContactResponse>{
        return this.contactService.sendMessage(DTO)
    }
  }