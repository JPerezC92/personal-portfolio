import clsx from 'clsx';

interface ComponentVariantsProps<T> {
	base?: string;
	variants?: T;
	defaults?: Partial<{ [K in keyof T]: keyof T[K] }>;
}

export function componentVariants<T extends object>({
	base,
	variants: variant,
}: ComponentVariantsProps<T>) {
	// type Variant = typeof variant;

	return (p: Partial<{ [K in keyof T]: keyof T[K] }>) =>
		clsx([
			base,
			...Object.entries(p).map(([k, v]) => {
				if (variant && variant[k as keyof T]) {
					return variant[k as keyof T][v as keyof T[keyof T]];
				}
				return '';
			}),
		]);
}
