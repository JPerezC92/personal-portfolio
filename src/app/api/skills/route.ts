import { NextResponse } from 'next/server';

import { skillList } from '@/shared/data/skills';

export async function GET() {
	return NextResponse.json(skillList);
}
