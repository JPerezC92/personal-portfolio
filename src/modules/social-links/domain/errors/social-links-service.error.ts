export class SocialLinksServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SocialLinksServiceError';
  }
}
