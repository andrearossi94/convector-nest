import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class GetProfileResponseDto {
  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  readonly userId: string;

  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  readonly lastnamne: string;

  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  readonly firstname: string;

  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  readonly roles: string;
}
