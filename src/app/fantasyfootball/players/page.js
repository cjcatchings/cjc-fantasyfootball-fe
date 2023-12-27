import getPlayerList from "@/services/player/playerListService";
import FantasyFootballPlayers from "@/components/fantasyfootball/players/players";
import { cookies } from 'next/headers';

const AUTH_COOKIE_NAME = process.env.NEXT_PUBLIC_COOKIE_TOKEN_ID;

export default async function Page(props){

    const accessToken = cookies().get(AUTH_COOKIE_NAME).value;
    const players = await getPlayerList(accessToken, [], null);

    return (
        <FantasyFootballPlayers players={players} />
    );

}
