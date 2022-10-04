import { IsAscii, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class HttpErrorMessage {
  constructor(statusCode: number, message: string) {
    this.statusCode = statusCode;
    this.message = message;
  }
  @ApiProperty()
  @IsNumber()
  statusCode: number;
  @ApiProperty()
  @IsAscii()
  message: string;
}
