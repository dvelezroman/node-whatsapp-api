import { Body, Controller, Post } from '@nestjs/common';
import { WhatsappService } from './whatsapp.service';
import { SendMessageDto } from './dto/send-message.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('whatsapp')
@Controller('whatsapp')
export class WhatsappController {
  constructor(private readonly whatsappService: WhatsappService) {}

  @Post('send')
  @ApiOperation({ summary: 'Send a WhatsApp message' })
  @ApiBody({ type: SendMessageDto })
  async sendMessage(@Body() body: SendMessageDto) {
    const phone = body.to.includes('@c.us') ? body.to : `${body.to}@c.us`;
    await this.whatsappService.sendMessage(phone, body.message);
    return { status: 'sent' };
  }
}
