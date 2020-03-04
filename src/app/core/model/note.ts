
import { Collaborator } from './collaborator';
export class Note {
  noteId: number;
  userId: number;
  title: string;
  description: string;
  isArchieve: boolean;
  isTrashed: boolean;
  isPinned: boolean;
  color: string;
  reminder: Date;
  Note: any[];
  collaborators: Collaborator[];
}