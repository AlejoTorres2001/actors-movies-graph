import { ApiProperty } from '@nestjs/swagger';

export class SignInOutput {
  refresh_token: string;
  @ApiProperty()
  access_token: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  id: string;
  @ApiProperty()
  username: string;
}
