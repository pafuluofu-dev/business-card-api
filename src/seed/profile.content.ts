import { SkillCategory } from '../generated/prisma/enums.js'

export type ProfileContent = {
  slug: string
  name: string
  headline: string
  description: string
  location: string
  email: string
  links: { label: string; url: string }[]
  skills: { name: string; category: SkillCategory }[]
  experience: {
    company: string
    companySite?: string
    position: string
    description: string
    startedAt: string
    finishedAt?: string
    achievements: string[]
    stack: string[]
  }[]
  projects: {
    name: string
    description: string
    demoUrl?: string
    repoUrl: string
    stack: string[]
  }[]
}

export const profileContent: ProfileContent = {
  slug: 'georgy-pavlov-kosov',
  name: 'Георгий Павлов-Косов',
  headline: 'Frontend-разработчик (React, TypeScript)',
  description:
    'Три года пишу интерфейсы на React и TypeScript: формы с валидацией, таблицы с серверным ' +
    'поиском и фильтрами, вёрстка по макетам Figma. Разделяю серверное и клиентское состояние, ' +
    'хожу в REST и GraphQL, покрываю код тестами. На Node.js работаю с обеих сторон — этот ' +
    'сервис собран на NestJS, Prisma и PostgreSQL.',
  location: 'Москва',
  email: 'pafuluofu@atomicmail.io',
  links: [
    { label: 'GitHub', url: 'https://github.com/pafuluofu-dev' },
    { label: 'Telegram', url: 'https://t.me/PafuluofuDev' },
  ],
  skills: [
    { name: 'TypeScript', category: SkillCategory.LANGUAGE },
    { name: 'JavaScript', category: SkillCategory.LANGUAGE },
    { name: 'React', category: SkillCategory.FRONTEND },
    { name: 'Next.js', category: SkillCategory.FRONTEND },
    { name: 'Redux Toolkit', category: SkillCategory.FRONTEND },
    { name: 'TanStack Query', category: SkillCategory.FRONTEND },
    { name: 'Sass/SCSS', category: SkillCategory.FRONTEND },
    { name: 'БЭМ', category: SkillCategory.FRONTEND },
    { name: 'Адаптивная вёрстка', category: SkillCategory.FRONTEND },
    { name: 'Node.js', category: SkillCategory.BACKEND },
    { name: 'NestJS', category: SkillCategory.BACKEND },
    { name: 'Socket.IO', category: SkillCategory.BACKEND },
    { name: 'GraphQL', category: SkillCategory.DATA },
    { name: 'REST API', category: SkillCategory.DATA },
    { name: 'Prisma', category: SkillCategory.DATA },
    { name: 'PostgreSQL', category: SkillCategory.DATA },
    { name: 'Jest', category: SkillCategory.TESTING },
    { name: 'Vitest', category: SkillCategory.TESTING },
    { name: 'React Testing Library', category: SkillCategory.TESTING },
    { name: 'Storybook', category: SkillCategory.TESTING },
    { name: 'Git', category: SkillCategory.TOOLING },
    { name: 'GitLab', category: SkillCategory.TOOLING },
    { name: 'Docker', category: SkillCategory.TOOLING },
    { name: 'CI/CD', category: SkillCategory.TOOLING },
    { name: 'Vite', category: SkillCategory.TOOLING },
    { name: 'Figma', category: SkillCategory.TOOLING },
  ],
  experience: [
    {
      company: 'Лаборатория Касперского',
      companySite: 'https://www.kaspersky.ru',
      position: 'Frontend-разработчик',
      description: 'Интерфейсы внутренних веб-приложений и пользовательских сервисов.',
      startedAt: '2024-09',
      finishedAt: '2026-09',
      achievements: [
        'Собирал сложные формы: валидация, динамические поля, зависимые состояния.',
        'Перевёл legacy-модули с JavaScript на TypeScript — в переработанных местах на 15–20% меньше дублирующегося кода.',
        'Развёл состояние по назначению: TanStack Query для серверных данных, Redux Toolkit для клиентских.',
        'Разобрал тяжёлые экраны на части и убрал лишние рендеры — интерфейс стал обновляться быстрее на 20%.',
        'Писал unit- и компонентные тесты на Jest и React Testing Library, вёл компоненты в Storybook.',
      ],
      stack: [
        'TypeScript',
        'React',
        'Redux Toolkit',
        'TanStack Query',
        'GraphQL',
        'REST API',
        'Sass/SCSS',
        'Jest',
        'Storybook',
        'Docker',
        'CI/CD',
      ],
    },
    {
      company: 'MailLift',
      companySite: 'https://maillift.com',
      position: 'Frontend-разработчик',
      description: 'Фронтенд SaaS-платформы для email-рассылок.',
      startedAt: '2023-09',
      finishedAt: '2024-09',
      achievements: [
        'Сделал многошаговое создание рассылки: аудитория, сегментация, расписание, валидация на каждом шаге.',
        'Таблицы кампаний и контактов с серверным поиском, фильтрами, сортировкой и пагинацией — работали на тысячах записей.',
        'Настроил кэширование в TanStack Query, лишних запросов к API стало на 20% меньше.',
        'Вынес повторяющуюся UI-логику в общие компоненты и хуки, дублирования стало меньше на 20%.',
        'Мемоизация и декомпозиция состояния убрали около 25% лишних ре-рендеров.',
      ],
      stack: [
        'TypeScript',
        'React',
        'Redux Toolkit',
        'TanStack Query',
        'GraphQL',
        'REST API',
        'Sass/SCSS',
        'Jest',
        'Vite',
        'GitLab',
        'Docker',
      ],
    },
  ],
  projects: [
    {
      name: 'Business Card API',
      description:
        'Эта визитка: GraphQL-схема профиля с вложенными навыками, опытом и проектами. База ' +
        'поднимается миграциями и наполняется при старте приложения.',
      repoUrl: 'https://github.com/pafuluofu-dev/business-card-api',
      stack: ['TypeScript', 'NestJS', 'GraphQL', 'Prisma', 'PostgreSQL', 'Docker'],
    },
    {
      name: 'Online Poker',
      description:
        'Клиент-серверный Texas Hold’em: раздачи и ставки считает сервер, обмен по WebSocket, ' +
        'клиенты браузерный и консольный.',
      repoUrl: 'https://github.com/pafuluofu-dev/Online-poker',
      stack: ['TypeScript', 'Node.js', 'Socket.IO'],
    },
    {
      name: 'Inverty',
      description:
        'Telegram Mini App для картинок: фильтры, дизеринг под чековые принтеры, ASCII-арт и EXIF. ' +
        'Вся обработка в браузере, файлы на сервер не уходят.',
      demoUrl: 'https://pafuluofu-dev.github.io/inverty-app/',
      repoUrl: 'https://github.com/pafuluofu-dev/inverty-app',
      stack: ['TypeScript', 'React', 'Canvas API'],
    },
    {
      name: 'Japan’s Goods',
      description: 'Интернет-магазин: каталог и категории, поиск, корзина, mock-оплата.',
      demoUrl: 'https://pafuluofu-dev.github.io/japans-goods-e-store/',
      repoUrl: 'https://github.com/pafuluofu-dev/japans-goods-e-store',
      stack: ['React', 'React Router', 'Sass', 'Vite'],
    },
    {
      name: 'Manor',
      description:
        'Магазин товаров для дома: адаптивная вёрстка по БЭМ, корзина, фильтры каталога.',
      demoUrl: 'https://pafuluofu-dev.github.io/manor-store/',
      repoUrl: 'https://github.com/pafuluofu-dev/manor-store',
      stack: ['React', 'Vite', 'Sass'],
    },
    {
      name: 'Spanish Roadmap',
      description:
        'План изучения испанского: занятия по дням, тесты, журнал ошибок, прогресс в localStorage.',
      demoUrl: 'https://pafuluofu-dev.github.io/spanish-roadmap/',
      repoUrl: 'https://github.com/pafuluofu-dev/spanish-roadmap',
      stack: ['TypeScript', 'React', 'GitHub Pages'],
    },
  ],
}
