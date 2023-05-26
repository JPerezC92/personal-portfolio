export type ComponentVariantsInfer<T> = T extends (...args: infer U) => any
	? Partial<U[0]>
	: never;
