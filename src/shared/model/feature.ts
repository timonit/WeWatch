export abstract class Feature<RETURN> {
  abstract execute(...args: unknown[]): RETURN;
} 
