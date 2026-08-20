'use client';

import { ProjectCard } from '@/modules/projects/components/ProjectCard';
import { ProjectsServiceError } from '@/modules/projects/domain/errors/projects-service.error';
import { useProjectList } from '@/modules/projects/hooks/use-project-list';

export function ProjectList() {
	const projectList = useProjectList();

	if (projectList instanceof ProjectsServiceError) {
		return null;
	}

	return (
		<ul className='flex flex-col gap-8'>
			{projectList.map(p => (
				<li key={p.title} className='contents'>
					<ProjectCard project={p} />
				</li>
			))}
		</ul>
	);
}
