export class NavigationServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NavigationServiceError';
  }
}
