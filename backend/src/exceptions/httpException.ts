export default class HttpException extends Error {
  public status: number;
  public code: string;
  constructor(status: number, code: string) {
    super(code);
    this.status = status;
    this.code = code;
  }
}
