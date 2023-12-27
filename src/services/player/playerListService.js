
const PLAYER_URL = process.env.PLAYER_URL;

export default function getPlayerList(accessToken, filters, fromKey){

    const url = fromKey ? `${PLAYER_URL}/${fromKey}` : PLAYER_URL;

    return fetch(url, {
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
            'Access-Control-Request-Headers': process.env.ACCESS_CONTROL_HEADERS
        }
    }).then(data => data.json());
};
