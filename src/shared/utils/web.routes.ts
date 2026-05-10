import { EnvironmentVariable } from '@/shared/utils/envVariables';

const home = EnvironmentVariable.WEB_URL;

export const webRoutes = {
	home,
	homeSection: (section: string) => `${home}#${section}`,
};
