import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

import { Project } from '@/modules/projects/domain/entities/project';
import { ProjectsServiceError } from '@/modules/projects/domain/errors/projects-service.error';
import { projectsService } from '@/modules/projects/services/projects.service';

import { projectKeys } from './keys';

export function useProjectList(): Project[] | ProjectsServiceError {
	const t = useTranslations('Projects');
	const { data, error } = useQuery({
		queryKey: projectKeys.all,
		queryFn: async () => {
			const r = await projectsService.getAll();
			if (r instanceof ProjectsServiceError) throw r;
			return r;
		},
	});

	if (error instanceof ProjectsServiceError) {
		return error;
	}

	const descriptions: string[] = [
		`${t('gentlemanBook')} ${t.rich('gentlemanBookCollab', { community: (chunks) => String(chunks) })}`,
		String(t.rich('alkybank', { cleanArch: (chunks) => String(chunks), openApi: (chunks) => String(chunks) })),
		String(t.rich('rickMorty', { community: (chunks) => String(chunks) })),
		String(t.rich('aerolab', { company: (chunks) => String(chunks) })),
	];

	return (data ?? []).map((project, index) => ({
		...project,
		description: descriptions[index] ?? '',
	}));
}
