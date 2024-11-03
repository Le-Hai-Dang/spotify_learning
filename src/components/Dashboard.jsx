import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = ({ accessToken, onLogout }) => {
    const [tracks, setTracks] = useState([]);

    useEffect(() => {
        if (!accessToken) return;

        const fetchTracks = async () => {
            const playlistId = '54ZA9LXFvvFujmOVWXpHga';
            try {
                const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                setTracks(response.data.items);
            } catch (error) {
                console.error('Error fetching playlist tracks:', error);
            }
        };

        fetchTracks();
    }, [accessToken]);

    const playTrack = (track) => {
        console.log(`Playing: ${track.name}`);
    };

    return (
        <div className="dashboard">
            <h1 className="dashboard-title">Playlist Tracks</h1>
            <button className="logout-button" onClick={onLogout}>Logout</button>
            {tracks.length > 0 ? (
                tracks.map((item, index) => (
                    <div key={index} className="track-container">
                        <img src={item.track.album.images[0]?.url} alt={item.track.name} className="track-image" />
                        <div className="track-info">
                            <h2 className="track-name">{item.track.name}</h2>
                            <p className="track-artist">Artist: {item.track.artists.map(artist => artist.name).join(', ')}</p>
                            <p className="track-album">Album: {item.track.album.name}</p>
                            <p className="track-popularity">Popularity: {item.track.popularity}</p>
                            <p className="track-duration">Duration: {(item.track.duration_ms / 60000).toFixed(2)} minutes</p>
                            {item.track.preview_url && (
                                <audio controls className="track-audio">
                                    <source src={item.track.preview_url} type="audio/mpeg" />
                                    Browser does not support the audio element.
                                </audio>
                            )}
                        </div>
                    </div>
                ))
            ) : (
                <p>No track information available.</p>
            )}
        </div>
    );
};

export default Dashboard;
