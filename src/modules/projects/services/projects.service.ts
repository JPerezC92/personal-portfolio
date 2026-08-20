import { RawProject } from '@/modules/projects/domain/entities/project';
import { ProjectsServiceError } from '@/modules/projects/domain/errors/projects-service.error';

export const projectsService = {
	getAll: async (): Promise<RawProject[] | ProjectsServiceError> => {
		try {
			const res = await fetch('/api/projects');

			if (!res.ok) {
				return new ProjectsServiceError(
					`Request failed with status ${res.status}`,
				);
			}

			return (await res.json()) as RawProject[];
		} catch (error) {
			return new ProjectsServiceError(
				error instanceof Error ? error.message : 'Unknown error',
			);
		}
	},
};
