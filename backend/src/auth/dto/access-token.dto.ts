import { ApiProperty } from '@nestjs/swagger';
import { Tokens } from './tokens.dto';

export class AccessToken {
  @ApiProperty({
    type: 'string',
  })
  access_token: Pick<Tokens, 'access_token'> | string;
}
