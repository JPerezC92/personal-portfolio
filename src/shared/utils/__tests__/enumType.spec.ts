import { describe, expect, it } from 'vitest';

import { EnumType } from '@/shared/utils/enumType';

describe('EnumType', () => {
	it('creates values object from arguments', () => {
		const Status = EnumType('active', 'inactive', 'pending');
		expect(Status.values.active).toBe('active');
		expect(Status.values.inactive).toBe('inactive');
		expect(Status.values.pending).toBe('pending');
	});

	it('creates iterable array from arguments', () => {
		const Status = EnumType('a', 'b', 'c');
		expect(Status.iterable).toEqual(['a', 'b', 'c']);
	});

	it('values are string literals', () => {
		const Direction = EnumType('up', 'down');
		expect(typeof Direction.values.up).toBe('string');
		expect(typeof Direction.values.down).toBe('string');
	});
});
