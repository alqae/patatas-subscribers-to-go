export class Filter {
  constructor(
    public criteria?: string,
    public page?: number,
    public count?: number,
    public sortOrder?: string,
    public sortType?: number,
  ) {}
}
