import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface VirtualizedListProps<T> {
  items: T[];
  itemHeight: number;
  containerHeight: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
}

function VirtualizedList<T>({
  items,
  itemHeight,
  containerHeight,
  renderItem,
  className = '',
}: VirtualizedListProps<T>) {
  const visibleItems = Math.floor(containerHeight / itemHeight) + 2; // Add buffer
  const startIndex = 0; // For now, show all items. In a real implementation, you'd track scroll position

  return (
    <div
      className={`overflow-auto ${className}`}
      style={{ height: containerHeight }}
    >
      <div style={{ height: items.length * itemHeight }}>
        {items.slice(startIndex, startIndex + visibleItems).map((item, index) => (
          <div
            key={startIndex + index}
            style={{
              height: itemHeight,
              transform: `translateY(${(startIndex + index) * itemHeight}px)`,
            }}
            className="absolute w-full p-4"
          >
            {renderItem(item, startIndex + index)}
          </div>
        ))}
      </div>
    </div>
  );
}

// Simple virtualized list for demonstration - in production, use react-window
export default VirtualizedList;