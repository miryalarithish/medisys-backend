export enum HttpHeaders {
  CONTENT_TYPE = 'Content-Type',
  CONTENT_DISPOSITION = 'Content-Disposition',
}

export enum ContentTypes {
  JSON = 'application/json',
  CSV = 'text/csv',
}

export enum ClientStatus {
  SUCCESS = 'SUCCESS',
  ACCEPTED = 'ACCEPTED',
  BAD_REQUEST = 'BAD_REQUEST',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
}
