import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { VariableType, GameItem, BucketDef } from './types';
import { Settings2, Lock, Eye, CheckCircle2 } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface Props {
  definition: BucketDef;
  items: GameItem[];
}

export const Bucket: React.FC<Props> = ({ definition, items }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: definition.id,
  });

  const getIcon = () => {
    switch (definition.id) {
      case VariableType.MANIPULATED:
        return <Settings2 className={clsx("w-6 h-6", definition.iconColor)} />;
      case VariableType.CONTROLLED:
        return <Lock className={clsx("w-6 h-6", definition.iconColor)} />;
      case VariableType.RESPONDING:
        return <Eye className={clsx("w-6 h-6", definition.iconColor)} />;
    }
  };

  return (
    <div
      ref={setNodeRef}
      className={twMerge(
        clsx(
          'flex flex-col h-full rounded-xl border-2 transition-all duration-200 ease-in-out',
          definition.bgColor,
          definition.borderColor,
          isOver ? `ring-2 ${definition.ringColor} scale-[1.02] shadow-lg` : 'shadow-sm'
        )
      )}
    >
      <div className="p-4 border-b border-white/50">
        <div className="flex items-center gap-3 mb-1">
          <div className="p-2 bg-white rounded-lg shadow-sm">{getIcon()}</div>
          <h3 className={clsx("font-bold text-lg", definition.color)}>{definition.label}</h3>
        </div>
        <p className={clsx("text-sm opacity-80 pl-1", definition.color)}>{definition.description}</p>
      </div>
      <div className="flex-1 p-4 min-h-[160px] space-y-2">
        {items.length === 0 && !isOver && (
          <div className="h-full flex items-center justify-center border-2 border-dashed border-white/40 rounded-lg">
            <p className={clsx("text-sm font-medium opacity-50", definition.color)}>拖曳卡片到這裡</p>
          </div>
        )}
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-2 p-3 bg-white/80 backdrop-blur-sm rounded-lg shadow-sm animate-pop">
            <CheckCircle2 className={clsx("w-4 h-4", definition.iconColor)} />
            <span className={clsx("font-medium", definition.color)}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};