module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: ['src/**/**.entity{.ts,.js}'],
  synchronize: true,
};
