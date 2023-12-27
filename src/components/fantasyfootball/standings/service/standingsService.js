const STANDINGS_URL = process.env.STANDINGS_URL;

export default function getFullStandings(accessToken){

    return fetch(STANDINGS_URL, {
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
            'Access-Control-Request-Headers': process.env.ACCESS_CONTROL_HEADERS
        }
    }).then(data => data.json());
};
