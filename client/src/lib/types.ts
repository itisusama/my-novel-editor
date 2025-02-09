export interface Note {
  id: string;
  title: string;
  content: string;
  updatedAt: number;
}

export type CreateNoteInput = Omit<Note, 'id' | 'updatedAt'>;
export type UpdateNoteInput = Partial<CreateNoteInput>;
