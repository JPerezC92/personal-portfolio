import { EnvironmentVariable } from '@/shared/utils';

const home = EnvironmentVariable.WEB_URL;

export const webRoutes = {
	home,
	homeSection: (section: string) => `${home}#${section}`,
};
