export enum VariableType {
  MANIPULATED = 'manipulated',
  CONTROLLED = 'controlled',
  RESPONDING = 'responding'
}

export interface GameItem {
  id: string;
  label: string;
  type: VariableType;
}

export interface Scenario {
  id: string;
  title: string;
  items: GameItem[];
}

export interface BucketDef {
  id: VariableType;
  label: string;
  description: string;
  color: string;
  bgColor: string;
  borderColor: string;
  iconColor: string;
  ringColor: string;
}

export interface ToastState {
  show: boolean;
  message: string;
  type: 'success' | 'error';
}