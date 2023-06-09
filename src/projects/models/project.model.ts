export interface Project {
	type: 'fullstack' | 'frontend' | 'backend';
	image: { url: string; width: number; height: number };
	title: string;
	description: JSX.Element;
	// site: string;
	// repository: string;
	tecnologieList: string[];
	linkList: { name: 'web' | 'repositorio' | 'api'; url: string }[];
}
