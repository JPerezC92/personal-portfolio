'use client';
import { HTMLMotionProps, motion, MotionProps as P } from 'framer-motion';
import React from 'react';

type Tag = keyof React.ReactHTML;

type MotionProps<T extends Tag> = {
	component?: T | 'div';
} & HTMLMotionProps<T> &
	P;

export const Motion = function Motion<T extends Tag>({
	component = 'div',
	...props
}: MotionProps<T>) {
	const Component = (motion as Record<string, any>)?.[component];
	return <Component {...props} />;
};
