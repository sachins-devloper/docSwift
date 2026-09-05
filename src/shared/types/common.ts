export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt?: string;
}

export type StatusState = 'idle' | 'loading' | 'success' | 'error';
