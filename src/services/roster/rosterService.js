
const ROSTER_URL = process.env.ROSTER_URL;

export default async function getOwnTeamRoster(accessToken){

    return fetch(ROSTER_URL, {
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
            'Access-Control-Request-Headers': process.env.ACCESS_CONTROL_HEADERS
        }
    }).then(data => data.json());
};

export async function getTeamRoster(accessToken, team){
    return fetch(`${ROSTER_URL}/${team}`, {
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
            'Access-Control-Request-Headers': process.env.ACCESS_CONTROL_HEADERS
        }
    }).then(data => data.json());
}

export async function movePlayerToPosition(accessToken, playerId, position){
    return fetch(`${ROSTER_URL}/move/${playerId}/${position}`,{
        'method': 'POST',
        'headers':{
            'Content-type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
            'Access-Control-Request-Headers': process.env.ACCESS_CONTROL_HEADERS
        }
    }).then(data => data.json());
}

export async function movePlayerToBench(accessToken, playerId){
    return fetch(`${ROSTER_URL}/bench/${playerId}`,{
        'method': 'POST',
        'headers': {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
            'Access-Control-Request-Headers': process.env.ACCESS_CONTROL_HEADERS   
        }     
    }).then(data => data.json());
}
