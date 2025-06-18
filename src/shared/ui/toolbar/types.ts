export interface ITool {
  name: string;
  handler(event: Event): void;
}
