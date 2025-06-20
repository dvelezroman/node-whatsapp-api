import { ApiProperty } from '@nestjs/swagger';

export class SendMessageDto {
  @ApiProperty({
    description:
      'Recipient phone number in international format (e.g., 5939XXXXXXX)',
    example: '593987654321',
  })
  to: string;

  @ApiProperty({
    description: 'Text message to send',
    example: 'Hello from NestJS via WhatsApp!',
  })
  message: string;
}
