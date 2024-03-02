export class ResponseDTO<T> {
  public data: T;
  public success: boolean;
  public errorCode: string;
  constructor(data: T, success = true, errorCode?: string) {
    this.data = data;
    this.success = success;
    this.errorCode = errorCode;
  }
}
