import getOwnTeamRoster from "@/services/roster/rosterService";
import Roster from "@/components/fantasyfootball/roster/roster";
import { cookies } from 'next/headers';

const AUTH_COOKIE_NAME = process.env.NEXT_PUBLIC_COOKIE_TOKEN_ID;

export default async function Page(props){

    const accessToken = cookies().get(AUTH_COOKIE_NAME).value;
    const myRoster = await getOwnTeamRoster(accessToken);

    return(
        <Roster playerRoster={myRoster} />
    );

}
