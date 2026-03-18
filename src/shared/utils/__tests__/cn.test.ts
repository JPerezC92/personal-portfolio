import { describe, expect, it } from 'vitest';

import { cn } from '@/shared/utils/cn';

describe('cn', () => {
	it('merges class names', () => {
		expect(cn('foo', 'bar')).toBe('foo bar');
	});

	it('handles conditional classes', () => {
		expect(cn('base', false && 'hidden', 'visible')).toBe('base visible');
	});

	it('resolves tailwind conflicts (last wins)', () => {
		const result = cn('px-4', 'px-2');
		expect(result).toBe('px-2');
	});

	it('handles empty inputs', () => {
		expect(cn()).toBe('');
	});

	it('handles undefined and null', () => {
		expect(cn('foo', undefined, null, 'bar')).toBe('foo bar');
	});
});
