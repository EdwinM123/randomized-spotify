const token = 'BQCfLwbExXyYUo3EpWBr4PqSVkCQPD86bb5WJP0bkX5bnBF70npqNFow67iawmnqFYQM7NzsKtPKBU6Ihrc0oK6Qw9iZeZVBUEtviSAWZBsmllWREi9VZ4TmieQekVx7pKW19wnum1C7gKmv_d_6JGuZjg9tewFQx8a6OOFpYOTA8ClFk1uE6IMtUvhb5BiJeDlClp5vIaGSi_mGgFILTimBCZNB27FNFLejoFJtgDtcMzmb2RncsX5zs9WqWfYfusvo6eI9zkuAPyTSqhVFip3k';
async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body:JSON.stringify(body)
  });
  return await res.json();
}

async function getRecommendations(){
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-recommendations
  return (await fetchWebApi(
    `v1/recommendations?limit=5&seed_tracks=${topTracksIds.join(',')}`, 'GET'
  )).tracks;
  
}

const recommendedTracks = getRecommendations();
const tracksUri = [
    'spotify:track:6wdWtY9TSHJkJcqrZYXszh','spotify:track:0xtIp0lgccN85GfGOekS5L','spotify:track:3q2v8QaTnHLveAQzR6gvYm','spotify:track:5TuTHrKzN6NweeQaKkBNb7','spotify:track:2YkIDPL5lGhRhomCq4S2RO','spotify:track:5bSASu4W0HJx6CuG8rbRcA','spotify:track:1xaTREM89RbIxkcjlpf4Uw','spotify:track:0MgOsVty0YR1kas7x16yoS','spotify:track:2aaCNg42RA74s0EmHTBqS7','spotify:track:0SaRvx9eYudSCQYNjuCQKX'
  ];

async function createPlaylist(tracksUri){
    const { id: user_id } = await fetchWebApi('v1/me', 'GET')
  
    const playlist = await fetchWebApi(
      `v1/users/${user_id}/playlists`, 'POST', {
        "name": "My recommendation playlist",
        "description": "Playlist created for you",
        "public": false
    })
  
    await fetchWebApi(
      `v1/playlists/${playlist.id}/tracks?uris=${tracksUri.join(',')}`,
      'POST'
    );
  
    return playlist;
  }
  
  const createdPlaylist =  createPlaylist(tracksUri);
  console.log(createdPlaylist.name, createdPlaylist.id);
  request.get(options, function(error, response, body) {
    console.log(body);
    token = access_token;
  });