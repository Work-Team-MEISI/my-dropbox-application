import { User } from '../../users/types/user';

export type Document = {
  documentId: string;
  name: string;
  createdAt: string;
  extension: string;
  creator: string;
  users: Array<string>;
  blob?: any;
};
