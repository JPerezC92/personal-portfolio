export class SkillsServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SkillsServiceError';
  }
}
