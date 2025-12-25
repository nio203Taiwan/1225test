import React, { useState, useEffect } from 'react';
import { DndContext, DragEndEvent, DragStartEvent, DragOverlay, useSensor, useSensors, PointerSensor, MouseSensor, TouchSensor } from '@dnd-kit/core';
import { FlaskConical, RefreshCw, ChevronRight, Trophy } from 'lucide-react';
import { SCENARIOS, BUCKET_DEFINITIONS } from './constants';
import { VariableType, GameItem, ToastState } from './types';
import { DraggableItem } from './components/DraggableItem';
import { Bucket } from './components/Bucket';
import { Toast } from './components/Toast';

export default function App() {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [poolItems, setPoolItems] = useState<GameItem[]>([]);
  const [buckets, setBuckets] = useState<Record<VariableType, GameItem[]>>({
    [VariableType.MANIPULATED]: [],
    [VariableType.CONTROLLED]: [],
    [VariableType.RESPONDING]: [],
  });
  const [shakeItemId, setShakeItemId] = useState<string | null>(null);
  const [toast, setToast] = useState<ToastState>({ show: false, message: '', type: 'success' });
  const [activeId, setActiveId] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);

  // Initialize scenario
  useEffect(() => {
    resetGame();
  }, [scenarioIndex]);

  const resetGame = () => {
    setPoolItems([...SCENARIOS[scenarioIndex].items]);
    setBuckets({
      [VariableType.MANIPULATED]: [],
      [VariableType.CONTROLLED]: [],
      [VariableType.RESPONDING]: [],
    });
    setCompleted(false);
    setShakeItemId(null);
    setToast({ show: false, message: '', type: 'success' });
  };

  // 使用多種傳感器以確保最佳兼容性 (滑鼠、觸控、筆)
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { 
      // 觸控需要較大的延遲或距離容忍度，這裡設為延遲 100ms 避免誤觸捲動
      activationConstraint: { delay: 100, tolerance: 5 } 
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
    setShakeItemId(null);
    setToast(prev => ({ ...prev, show: false }));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const item = poolItems.find((i) => i.id === active.id);
    if (!item) return;

    const targetBucketType = over.id as VariableType;

    if (item.type === targetBucketType) {
      // Success
      setPoolItems((prev) => prev.filter((i) => i.id !== item.id));
      setBuckets((prev) => ({
        ...prev,
        [targetBucketType]: [...prev[targetBucketType], item],
      }));
      
      // Success feedback
      setToast({ show: true, message: '答對了！', type: 'success' });
      setTimeout(() => setToast(prev => ({ ...prev, show: false })), 1000);
      
      // Check completion
      if (poolItems.length === 1) {
        setCompleted(true);
      }
    } else {
      // Failure
      setShakeItemId(item.id);
      
      // Error Message Logic
      let message = '放錯位置囉！再想一想。';
      if (item.type === VariableType.MANIPULATED && targetBucketType === VariableType.CONTROLLED) {
        message = '這是我們主要改變的「主角」，不能固定喔！';
      } else if (item.type === VariableType.CONTROLLED && targetBucketType === VariableType.MANIPULATED) {
        message = '這是要保持一樣的「配角」，不能隨便改變喔！';
      } else if (item.type === VariableType.RESPONDING) {
        message = '這是實驗的「結果」，不是我們設定的條件喔！';
      } else if (targetBucketType === VariableType.RESPONDING) {
        message = '這個不是我們要觀察的「結果」喔！';
      }

      setToast({ show: true, message, type: 'error' });
      
      // Remove shake after animation
      setTimeout(() => setShakeItemId(null), 600);
      // Remove toast after 3s
      setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000);
    }
  };

  const nextLevel = () => {
    if (scenarioIndex < SCENARIOS.length - 1) {
      setScenarioIndex(prev => prev + 1);
    } else {
      setScenarioIndex(0); // Loop back
    }
  };

  const activeItem = activeId ? poolItems.find(i => i.id === activeId) : null;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <FlaskConical className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-slate-800">變因歸位大作戰</h1>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={scenarioIndex}
              onChange={(e) => setScenarioIndex(Number(e.target.value))}
              className="px-3 py-2 bg-slate-100 border-none rounded-lg text-sm font-medium text-slate-700 focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              {SCENARIOS.map((s, idx) => (
                <option key={s.id} value={idx}>
                  {idx + 1}. {s.title}
                </option>
              ))}
            </select>
            <button
              onClick={resetGame}
              className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors"
              title="重置"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <main className="flex-1 max-w-6xl mx-auto w-full p-4 md:p-6 grid lg:grid-cols-4 gap-6 md:gap-8">
          
          {/* Left Column: Pool */}
          <section className="lg:col-span-1 order-2 lg:order-1">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm h-full">
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
                待分類卡片 ({poolItems.length})
              </h2>
              <div className="space-y-2">
                {poolItems.map((item) => (
                  <DraggableItem
                    key={item.id}
                    item={item}
                    isShaking={shakeItemId === item.id}
                  />
                ))}
                {poolItems.length === 0 && !completed && (
                  <div className="text-center py-10 text-slate-400 text-sm">
                    太棒了！所有卡片都分類完畢
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Right Column: Buckets */}
          <section className="lg:col-span-3 order-1 lg:order-2 grid md:grid-cols-3 gap-4">
            {BUCKET_DEFINITIONS.map((def) => (
              <Bucket
                key={def.id}
                definition={def}
                items={buckets[def.id]}
              />
            ))}
          </section>

        </main>

        <DragOverlay>
          {activeItem ? (
            <div className="px-4 py-3 bg-indigo-600 text-white rounded-lg shadow-xl font-medium flex items-center gap-3 cursor-grabbing scale-105">
              <span>{activeItem.label}</span>
              <FlaskConical className="w-4 h-4 opacity-50" />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Completion Overlay */}
      {completed && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl animate-pop">
            <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trophy className="w-10 h-10 text-yellow-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">挑戰成功！</h2>
            <p className="text-slate-600 mb-8">
              太厲害了！你已經完全掌握了這個實驗的變因設計。
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={resetGame}
                className="px-6 py-3 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                再玩一次
              </button>
              <button
                onClick={nextLevel}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 transition-all flex items-center gap-2"
              >
                下一關
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      <Toast toast={toast} />
    </div>
  );
}