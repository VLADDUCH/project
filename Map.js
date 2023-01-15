import React, { useState, useEffect } from 'react';
import { Map as MapboxMap, Marker, Popup, NavigationControl } from 'react-mapbox-gl';
import { useProjects } from '../services/projects';

const accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';

function Map() {
    const [mapCenter, setMapCenter] = useState([18.5392, -72.336]);
    const [mapZoom, setMapZoom] = useState(7);
    const { projects } = useProjects();

    useEffect(() => {
        if (projects.length > 0) {
            const latlngs = projects.map((project) => [project.latitude, project.longitude]);
            const bounds = latlngs.reduce((bounds, latlng) => bounds.extend(latlng), new mapboxgl.LngLatBounds());
            setMapCenter(bounds.getCenter());
            setMapZoom(8);
        }
    }, [projects]);

    return (
        <MapboxMap
            style="mapbox://styles/mapbox/streets-v11"
            containerStyle={{
                height: '600px',
                width: '100%'
            }}
            center={mapCenter}
            zoom={[mapZoom]}
            accessToken={accessToken}
        >
            {projects.map((project) => (
                <Marker key={project._id} coordinates={[project.longitude, project.latitude]}>
                    <Popup>{project.name}</Popup>
                </Marker>
            ))}
            <NavigationControl showCompass={false} />
        </MapboxMap>
    );
}

export default Map;
