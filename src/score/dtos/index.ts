import { Score } from '../interfaces';
import { ApiProperty } from '@nestjs/swagger';

export class ScoreDto implements Score {
  @ApiProperty()
  username: string;

  @ApiProperty()
  score: number;
}
