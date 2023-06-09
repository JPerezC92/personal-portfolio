export function EnumType<T extends Readonly<string[]>>(...args: T) {
	return {
		iterable: Array.from(new Set(args)) as unknown as UniqueArray<T>,
		values: args.reduce(
			(a, b) => ({ ...a, [b.trim().replace(' ', '')]: b }),
			{},
		) as {
			[key in T[number]]: key;
		},
	} as const;
}

export type EnumTypeInfer<T> = T extends { iterable: infer U }
	? U extends Readonly<Array<infer V>>
		? V
		: never
	: never;

type UniqueArray<T> = T extends readonly [infer X, ...infer Rest]
	? InArray<Rest, X> extends true
		? [...UniqueArray<Rest>]
		: readonly [X, ...UniqueArray<Rest>]
	: T;

type InArray<T, X> = T extends readonly [X, ...infer _Rest]
	? true
	: T extends readonly [X]
	? true
	: T extends readonly [infer _, ...infer Rest]
	? InArray<Rest, X>
	: false;
