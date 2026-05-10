import { useTranslations } from 'next-intl';

import { Project } from '@/modules/projects/domain/entities/project';
import { ProjectsServiceError } from '@/modules/projects/domain/errors/projects-service.error';
import { projectsService } from '@/modules/projects/services/projects.service';

export function useProjectList(): Project[] | ProjectsServiceError {
	const t = useTranslations('Projects');
	const raw = projectsService.getAll();

	if (raw instanceof ProjectsServiceError) {
		return raw;
	}

	const descriptions: string[] = [
		`${t('gentlemanBook')} ${t.rich('gentlemanBookCollab', { community: (chunks) => String(chunks) })}`,
		String(t.rich('alkybank', { cleanArch: (chunks) => String(chunks), openApi: (chunks) => String(chunks) })),
		String(t.rich('rickMorty', { community: (chunks) => String(chunks) })),
		String(t.rich('aerolab', { company: (chunks) => String(chunks) })),
	];

	return raw.map((project, index) => ({
		...project,
		description: descriptions[index] ?? '',
	}));
}
