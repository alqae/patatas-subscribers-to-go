export class IResponse<T> {
  constructor(
    public Count: number,
    public Data: T,
    public message?: string | T,
  ) {}
}