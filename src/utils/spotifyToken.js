import base64 from 'react-native-base64';

const apiPrefix= 'https://accounts.spotify.com/api';
const client_id= '54611887bbe64bd0b186175f13477c84';
const client_secret= '357fc43b162f498085bfb82257632c6b';

const base64credentials= base64.encode(client_id + ':' + client_secret);

export default async () => {
    console.log('token begin');

    const res = await fetch(`${apiPrefix}/token`, {
        method: 'POST',
        headers: {
            Authorization: `Basic ${base64credentials}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'grant_type=client_credentials',
    });
    
    const json = await res.json();
    const newToken = json.access_token;
    console.log('token is', newToken);
    return newToken;

}