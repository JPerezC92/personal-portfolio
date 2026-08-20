import { NextResponse } from 'next/server';

import { socialList } from '@/shared/data/socialList';

export async function GET() {
	return NextResponse.json(
		socialList.map(({ link, icon, title }) => ({ link, icon, title })),
	);
}
