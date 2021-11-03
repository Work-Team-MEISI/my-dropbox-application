export class AddDocumentDTO {
  name: string;
  blob: Blob;
  extension: string;
  users: Array<string>;
}
