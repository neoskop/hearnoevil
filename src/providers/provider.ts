export abstract class Provider {
  constructor(protected ids: string[], protected apiKey: string) {}
  public abstract mute(): Promise<void[]>;
  public abstract unmute(): Promise<void[]>;
}
