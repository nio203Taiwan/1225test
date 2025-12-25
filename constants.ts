import { Scenario, VariableType } from './types';

export const SCENARIOS: Scenario[] = [
  {
    id: 's1',
    title: '空氣量是否影響燃燒時間',
    items: [
      { id: 's1-1', label: '瓶子的大小', type: VariableType.MANIPULATED },
      { id: 's1-2', label: '蠟燭的粗細', type: VariableType.CONTROLLED },
      { id: 's1-3', label: '點火的時間', type: VariableType.CONTROLLED },
      { id: 's1-4', label: '熄滅的秒數', type: VariableType.RESPONDING },
      { id: 's1-5', label: '實驗的地點', type: VariableType.CONTROLLED },
      { id: 's1-6', label: '瓶子的蓋法', type: VariableType.CONTROLLED },
    ],
  },
  {
    id: 's2',
    title: '燃燒是否需要空氣 (有無罩瓶子對照)',
    items: [
      { id: 's2-1', label: '有無罩瓶子', type: VariableType.MANIPULATED },
      { id: 's2-2', label: '蠟燭的粗細', type: VariableType.CONTROLLED },
      { id: 's2-3', label: '瓶子的大小', type: VariableType.CONTROLLED },
      { id: 's2-4', label: '熄滅的秒數', type: VariableType.RESPONDING },
      { id: 's2-5', label: '實驗的地點', type: VariableType.CONTROLLED },
      { id: 's2-6', label: '點火的時間', type: VariableType.CONTROLLED },
    ],
  },
  {
    id: 's3',
    title: '蠟燭粗細是否影響燃燒時間',
    items: [
      { id: 's3-1', label: '蠟燭的粗細', type: VariableType.MANIPULATED },
      { id: 's3-2', label: '瓶子的大小', type: VariableType.CONTROLLED },
      { id: 's3-3', label: '點火的時間', type: VariableType.CONTROLLED },
      { id: 's3-4', label: '熄滅的秒數', type: VariableType.RESPONDING },
      { id: 's3-5', label: '實驗的地點', type: VariableType.CONTROLLED },
      { id: 's3-6', label: '瓶子的蓋法', type: VariableType.CONTROLLED },
    ],
  },
  {
    id: 's4',
    title: '蠟燭長短是否影響燃燒時間',
    items: [
      { id: 's4-1', label: '蠟燭的長短', type: VariableType.MANIPULATED },
      { id: 's4-2', label: '蠟燭的粗細', type: VariableType.CONTROLLED },
      { id: 's4-3', label: '瓶子的大小', type: VariableType.CONTROLLED },
      { id: 's4-4', label: '熄滅的秒數', type: VariableType.RESPONDING },
      { id: 's4-5', label: '實驗的地點', type: VariableType.CONTROLLED },
      { id: 's4-6', label: '點火的時間', type: VariableType.CONTROLLED },
    ],
  },
];

export const BUCKET_DEFINITIONS = [
  {
    id: VariableType.MANIPULATED,
    label: '操作變因 (主角)',
    description: '只有一個，我們要改變的',
    color: 'text-orange-700',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    iconColor: 'text-orange-500',
    ringColor: 'ring-orange-400',
  },
  {
    id: VariableType.CONTROLLED,
    label: '控制變因 (配角)',
    description: '全部要一樣，我們要固定的',
    color: 'text-blue-700',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    iconColor: 'text-blue-500',
    ringColor: 'ring-blue-400',
  },
  {
    id: VariableType.RESPONDING,
    label: '應變變因 (結果)',
    description: '我們要測量觀察的',
    color: 'text-purple-700',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    iconColor: 'text-purple-500',
    ringColor: 'ring-purple-400',
  },
];