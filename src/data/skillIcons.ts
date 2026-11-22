import type { IconType } from 'react-icons';
import {
  SiAngular, SiReact, SiNextdotjs, SiTailwindcss, SiHtml5, SiCss,
  SiTypescript, SiJavascript, SiPython, SiC,
  SiNodedotjs, SiExpress, SiFirebase,
  SiPostgresql, SiMysql, SiMongodb, SiPrisma,
  SiGit, SiGithub, SiDocker, SiPostman, SiGithubcopilot, SiCursor, SiClaude,
  SiGoogleanalytics, SiJira,
} from 'react-icons/si';
import {
  TbApi, TbBrandAws, TbLambda, TbDatabase, TbBrandReactNative, TbBrandOpenai, TbSparkles, TbRefresh,
} from 'react-icons/tb';

/** Logo for each skill/technology name shown on the site. Shared by Skills and Experience. */
export const skillIcons: Record<string, IconType> = {
  // Languages
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  Python: SiPython,
  C: SiC,
  HTML5: SiHtml5,
  CSS3: SiCss,
  // Frontend
  Angular: SiAngular,
  React: SiReact,
  'Next.js': SiNextdotjs,
  'React Native': TbBrandReactNative,
  'Tailwind CSS': SiTailwindcss,
  // Backend & Cloud
  'Node.js': SiNodedotjs,
  'Express.js': SiExpress,
  'REST APIs': TbApi,
  Firebase: SiFirebase,
  'Cloud Functions & FCM': SiFirebase,
  AWS: TbBrandAws,
  'AWS Lambda': TbLambda,
  // Databases
  PostgreSQL: SiPostgresql,
  MySQL: SiMysql,
  MongoDB: SiMongodb,
  Firestore: SiFirebase,
  DynamoDB: TbDatabase,
  Prisma: SiPrisma,
  // Tools & AI
  Git: SiGit,
  GitHub: SiGithub,
  Docker: SiDocker,
  Postman: SiPostman,
  'GitHub Copilot': SiGithubcopilot,
  Cursor: SiCursor,
  'Claude Code': SiClaude,
  ChatGPT: TbBrandOpenai,
  Antigravity: TbSparkles,
  // Work
  'Google Analytics 4': SiGoogleanalytics,
  Jira: SiJira,
  Agile: TbRefresh,
};
