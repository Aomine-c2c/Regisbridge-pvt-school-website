// Reusable Section Components
export { default as PageHero } from './sections/PageHero';
export { default as Section } from './sections/Section';
export { default as CardGrid } from './sections/CardGrid';
export { default as StatCard } from './sections/StatCard';

export type { PageHeroProps } from './sections/PageHero';
export type { SectionProps } from './sections/Section';
export type { CardGridProps } from './sections/CardGrid';
export type { StatCardProps } from './sections/StatCard';

// Form components
export { LoginForm } from './forms/LoginForm';
export { RegisterForm } from './forms/RegisterForm';
export { default as OnlineApplication } from './forms/OnlineApplication';

// Other components
export { ErrorBoundary } from './ErrorBoundary';
export { ProtectedRoute } from './ProtectedRoute';

// UI Components (Stitch-inspired) - Note: These use named exports
export { Timeline } from './ui/Timeline';
export { ProfileCard } from './ui/ProfileCard';
export { StatBar, StatBarList } from './ui/StatBar';
export { IDCard } from './ui/IDCard';
export { NoticeBoard } from './ui/NoticeBoard';
export { TimetableGrid } from './ui/TimetableGrid';
export { Leaderboard } from './ui/Leaderboard';
export { default as DropdownMenu } from './ui/DropdownMenu';