import { User } from '../../users/types/user';

export type Document = {
  documentId: string;
  name: string;
  createdAt: string;
  extension: string;
  users: Array<User>;
  blob?: unknown;
};
