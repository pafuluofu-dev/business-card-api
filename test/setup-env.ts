// e2e поднимает приложение с заглушкой вместо PrismaService: настоящая база не нужна,
// поэтому и заполнять её при старте нечего
process.env.DATABASE_URL ??= 'postgresql://test:test@127.0.0.1:5432/test'
process.env.SEED_ON_START = 'false'
