export class AddDocumentDTO {
  name: string;
  blob: any;
  extension: string;
  creator: string;
  users: Array<string>;
}
