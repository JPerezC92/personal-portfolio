import { NextResponse } from 'next/server';

import { rawProjectList } from '@/shared/data/projects';

export async function GET() {
	return NextResponse.json(rawProjectList);
}
