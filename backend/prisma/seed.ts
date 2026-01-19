import { PrismaClient, Role, PlayerPosition, ChampionshipFormat, ChampionshipStatus, FantasyAction } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('admin123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@asf7.com' },
    update: {},
    create: {
      name: 'Administrador ASF7',
      email: 'admin@asf7.com',
      password,
      role: Role.ADMIN,
    },
  });

  const championship = await prisma.championship.create({
    data: {
      name: 'ASF7 Liga Principal',
      season: '2024',
      status: ChampionshipStatus.ACTIVE,
      format: ChampionshipFormat.GROUPS_KNOCKOUT,
      groupsNumber: 2,
      qualifiersNumber: 4,
    },
  });

  const teamA = await prisma.team.create({
    data: {
      name: 'Fut7 Stars',
      championshipId: championship.id,
    },
  });

  const teamB = await prisma.team.create({
    data: {
      name: 'ASF7 Legends',
      championshipId: championship.id,
    },
  });

  await prisma.player.createMany({
    data: [
      {
        name: 'Carlos Gol',
        position: PlayerPosition.ATA,
        teamId: teamA.id,
      },
      {
        name: 'Lucas Muralha',
        position: PlayerPosition.GK,
        teamId: teamA.id,
      },
      {
        name: 'Rafa Maestro',
        position: PlayerPosition.MID,
        teamId: teamB.id,
      },
      {
        name: 'João Defesa',
        position: PlayerPosition.DEF,
        teamId: teamB.id,
      },
    ],
  });

  await prisma.news.createMany({
    data: [
      {
        title: 'Bem-vindo ao ASF7',
        content: 'Acompanhe o campeonato com notícias e estatísticas completas.',
        images: [],
        featured: true,
        published: true,
      },
      {
        title: 'Tabela divulgada',
        content: 'Confira os próximos jogos da temporada 2024.',
        images: [],
        featured: false,
        published: true,
      },
    ],
  });

  await prisma.banner.createMany({
    data: [
      {
        title: 'Inscrições abertas',
        imageUrl: '/uploads/banner-exemplo.png',
        linkTarget: 'https://asf7.com/inscricoes',
        order: 1,
        active: true,
      },
      {
        title: 'Assista ao vivo',
        imageUrl: '/uploads/banner-live.png',
        linkTarget: 'https://youtube.com',
        order: 2,
        active: true,
      },
    ],
  });

  await prisma.tvConfig.create({
    data: {
      youtubeChannelUrl: 'https://youtube.com/@asf7',
      liveUrl: 'https://youtube.com/live',
      playlists: ['https://youtube.com/playlist?list=ASF7'],
    },
  });

  await prisma.fantasyConfig.create({
    data: {
      initialBudget: 120,
      gkCount: 1,
      defCount: 2,
      midCount: 2,
      ataCount: 1,
    },
  });

  await prisma.fantasyScore.createMany({
    data: [
      { action: FantasyAction.GOAL, points: 5 },
      { action: FantasyAction.ASSIST, points: 3 },
      { action: FantasyAction.SAVE, points: 2 },
      { action: FantasyAction.FOUL_COMMITTED, points: -1 },
      { action: FantasyAction.FOUL_SUFFERED, points: 1 },
      { action: FantasyAction.YELLOW, points: -2 },
      { action: FantasyAction.RED, points: -5 },
      { action: FantasyAction.SHOT_ON_TARGET, points: 1 },
      { action: FantasyAction.SHOT_ON_POST, points: 2 },
    ],
  });

  console.log('Seed finalizada. Admin:', admin.email);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
