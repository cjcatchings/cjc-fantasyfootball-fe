import { movePlayerToPosition } from '@/services/roster/rosterService';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const AUTH_COOKIE_NAME = process.env.NEXT_PUBLIC_COOKIE_TOKEN_ID;

export async function POST(request, {params}){
    const [playerId, position] = params.slug;
    const accessToken = cookies().get(AUTH_COOKIE_NAME).value;
    const updatedRoster = await movePlayerToPosition(accessToken, playerId, position);

    return NextResponse.json(updatedRoster);
}
