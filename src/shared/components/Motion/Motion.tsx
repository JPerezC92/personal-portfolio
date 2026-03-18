'use client';
import type { HTMLMotionProps, MotionProps as P } from 'framer-motion';
import { motion } from 'framer-motion';

type Tag =
	| 'div'
	| 'span'
	| 'section'
	| 'article'
	| 'main'
	| 'header'
	| 'footer'
	| 'nav'
	| 'ul'
	| 'li'
	| 'a'
	| 'button'
	| 'picture'
	| 'p'
	| 'h1'
	| 'h2'
	| 'h3'
	| 'h4'
	| 'h5'
	| 'h6';

type MotionProps<T extends Tag> = {
	component?: T | 'div';
} & HTMLMotionProps<T> &
	P;

export const Motion = function Motion<T extends Tag = 'div'>({
	component = 'div',
	...props
}: MotionProps<T>) {
	const Component = (motion as Record<string, any>)?.[component];
	return <Component {...props} />;
};
