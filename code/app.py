import spotipy
from spotipy.oauth2 import SpotifyOAuth

scope = 'user-library-read';
sp = spotipy.Spotify(auth_manager=SpotifyOAuth(scope=scope))

results =sp.current_user_saved_tracks()
for idx, item in enumerate(results['items']):
    track =item['track']
    print(idx, track['artists'][0]['name'], ' - ', track['name']);

#export SPOTIFY_CLIENT_ID=c3ba64ffe40b4fe5b885ad9baf266d96