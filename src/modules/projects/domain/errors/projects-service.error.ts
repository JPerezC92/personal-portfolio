export class ProjectsServiceError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'ProjectsServiceError';
	}
}
