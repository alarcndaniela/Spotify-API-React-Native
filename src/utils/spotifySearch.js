const apiPrefix = 'https://api.spotify.com/v1';

export default async ({
    offset,
    limit,
    q,
    spotify_token,
}) => {
    const uri = `${apiPrefix}/search?type=album,artist,track,playlist&limit=${limit}&offset=${offset}&q=${encodeURIComponent(q)}*`;
    console.log('search begin, uri=', uri, 'token=', spotify_token);

    const res = await fetch(uri, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${spotify_token}`,
        }
    });

    const json = await res.json();

    if(!res.ok) {
        return [];
    }

    const {
         tracks: {
            items,
         }
    } = json;

    console.log(items);

    return items.map(item => ({
        id: item.id,
        title: item.name,
        popularity: item.popularity,
        artist: item.artists
            ? item.artists[0].name 
            : undefined,
        album: item.album.name,
        imageUri: item.album.images
            ? item.album.images[0].url 
            : undefined,
        release_date: item.release_date,
        spotify: item.album.external_urls.spotify,
        type: item.type,
        release_date: item.album.release_date,
    }));
};

