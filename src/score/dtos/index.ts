import { IsNotEmpty, Min } from 'class-validator';
import { UserScore } from '../interfaces';

export class CreateScoreDto implements UserScore {
  @IsNotEmpty()
  name: string;

  @Min(0)
  score: number;
}

export class LeaderboardResponse {
  data: UserScore[];
}
