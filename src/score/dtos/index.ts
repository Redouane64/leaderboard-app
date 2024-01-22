import { IsNotEmpty, Min } from 'class-validator';
import { UserScore } from '../interfaces';
import { ApiProperty } from '@nestjs/swagger';

export class CreateScoreDto implements UserScore {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @Min(0)
  score: number;
}

export class LeaderboardResponse {
  @ApiProperty({ type: [CreateScoreDto] })
  data: UserScore[];
}
