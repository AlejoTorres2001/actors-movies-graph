import { ApiProperty } from '@nestjs/swagger';

export class Tokens {
  @ApiProperty()
  access_token: string;
  refresh_token: string;
}
