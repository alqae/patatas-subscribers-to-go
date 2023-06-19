export class Subscriptor {
  constructor(
    public Id: number,
    public Area: string,
    public PublicId: number,
    public CountryCode: string,
    public CountryName: string,
    public Name: string,
    public EndpointsCount: number,
    public Email: string,
    public JobTitle: string,
    public PhoneNumber: string,
    public PhoneCode: string,
    public PhoneCodeAndNumber: string,
    public SubscriptionMethod: number,
    public SubscriptionState: number,
    public SubscriptionStateDescription: string,
    public Topics: unknown[],
    public ValidEmail: boolean,
    public Activity: string,
    public ConnectionState: number,
    public SubscriptionDate?: unknown,
    public LastActivityUtc?: unknown,
    public LastActivity?: unknown,
    public LastActivitystring?: unknown,
    public SystemId?: unknown
  ) { }
}