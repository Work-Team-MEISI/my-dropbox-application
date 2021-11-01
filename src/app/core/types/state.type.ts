import { Document } from 'src/app/use-cases/features/documents/types/document.type';
import { User } from 'src/app/use-cases/features/users/types/user';

export type State = {
  documents: Array<Document>;
  user: User;
};
