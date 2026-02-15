import { Hero } from './sections/Hero';
import { Stats } from './sections/Stats';

export const COMPONENT_REGISTRY: Record<string, React.ComponentType<Record<string, unknown>>> = {
  'hero_slider': Hero,
  'stats_grid': Stats,
  // Future components: 'news_feed', 'text_block', 'gallery'
};
