export abstract class Provider {
  constructor(protected id: string, protected apiKey: string) {}
  public abstract mute(): Promise<void>;
  public abstract unmute(): Promise<void>;
}
