module.exports = {
	multiProject: false,
	skipFinalStep: false,
	checkExistenceOnCreate: false,
	folderPath: 'src/',
	templatesFolder: 'templates',
	templates: [
		{
			name: 'component',
			files: {
				component: {
					name: '[name].tsx',
					file: 'fc.tmp',
				},
				style: {
					name: '[name].css.ts',
					file: 'css.tmp',
					optional: true,
				},
				test: {
					name: '__tests__/[name].test.tsx',
					file: 'test.tmp',
					optional: true,
					default: false,
				},
			},
		},
	],
	placeholders: {
		NAME: ({ componentName }) => componentName,
		COMPONENT_FILE_PREFIX: ({ filePrefix }) => filePrefix,
	},
};
