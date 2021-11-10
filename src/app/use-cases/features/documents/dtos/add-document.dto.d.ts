export class AddDocumentDTO {
  name: string;
  blob: Blob;
  extension: string;
  creator: string;
  users: Array<string>;
}
