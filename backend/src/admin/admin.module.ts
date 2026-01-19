import { Module } from '@nestjs/common';
import { NewsController } from './news/news.controller';
import { NewsService } from './news/news.service';
import { BannersController } from './banners/banners.controller';
import { BannersService } from './banners/banners.service';
import { PollsController } from './polls/polls.controller';
import { PollsService } from './polls/polls.service';
import { VotesController } from './votes/votes.controller';
import { VotesService } from './votes/votes.service';
import { TvController } from './tv/tv.controller';
import { TvService } from './tv/tv.service';
import { ChampionshipsController } from './championships/championships.controller';
import { ChampionshipsService } from './championships/championships.service';
import { TeamsController } from './teams/teams.controller';
import { TeamsService } from './teams/teams.service';
import { PlayersController } from './players/players.controller';
import { PlayersService } from './players/players.service';
import { RoundsController } from './rounds/rounds.controller';
import { RoundsService } from './rounds/rounds.service';
import { MatchesController } from './matches/matches.controller';
import { MatchesService } from './matches/matches.service';
import { MatchStatsController } from './match-stats/match-stats.controller';
import { MatchStatsService } from './match-stats/match-stats.service';
import { FantasyController } from './fantasy/fantasy.controller';
import { FantasyService } from './fantasy/fantasy.service';

@Module({
  controllers: [
    NewsController,
    BannersController,
    PollsController,
    VotesController,
    TvController,
    ChampionshipsController,
    TeamsController,
    PlayersController,
    RoundsController,
    MatchesController,
    MatchStatsController,
    FantasyController,
  ],
  providers: [
    NewsService,
    BannersService,
    PollsService,
    VotesService,
    TvService,
    ChampionshipsService,
    TeamsService,
    PlayersService,
    RoundsService,
    MatchesService,
    MatchStatsService,
    FantasyService,
  ],
})
export class AdminModule {}
