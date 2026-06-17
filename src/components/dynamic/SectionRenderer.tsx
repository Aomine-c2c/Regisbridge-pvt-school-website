'use client';

import React from 'react';
import { COMPONENT_REGISTRY } from './ComponentRegistry';

export interface SectionConfig {
  id: string;
  type: string;
  props?: Record<string, unknown>;
}

export interface PageConfig {
  sections: SectionConfig[];
}

interface SectionRendererProps {
  config?: PageConfig | null;
}

export function SectionRenderer({ config }: SectionRendererProps) {
  if (!config || !config.sections || config.sections.length === 0) {
    // Render default layout if no config exists
    const DefaultHero = COMPONENT_REGISTRY['hero_slider'];
    const DefaultStats = COMPONENT_REGISTRY['stats_grid'];
    return (
        <>
            <DefaultHero />
            <DefaultStats />
        </>
    );
  }

  return (
    <>
      {config.sections.map((section: any) => {
        const Component = COMPONENT_REGISTRY[section.type];
        if (!Component) {
          console.warn(`Unknown component type: ${section.type}`);
          return null;
        }
        return <Component key={section.id} {...(section.props || {})} />;
      })}
    </>
  );
}
