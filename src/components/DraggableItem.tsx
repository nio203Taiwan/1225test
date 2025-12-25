import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import { GameItem } from '../types';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface Props {
  item: GameItem;
  isShaking?: boolean;
}

export const DraggableItem: React.FC<Props> = ({ item, isShaking }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: item.id,
    data: { item },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={twMerge(
        clsx(
          'relative flex items-center justify-between p-4 mb-3 bg-white rounded-lg shadow-sm border border-slate-200 cursor-grab touch-none transition-all',
          'hover:shadow-md hover:border-indigo-300',
          isDragging ? 'opacity-50 z-50 scale-105' : 'opacity-100',
          isShaking && 'animate-shake border-red-400 bg-red-50'
        )
      )}
    >
      <span className="font-medium text-slate-700">{item.label}</span>
      <GripVertical className="w-4 h-4 text-slate-400" />
    </div>
  );
};