import React from 'react';

export default function Map() {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{minHeight: "690px"}}>
            <iframe className="shadow border-dark border-1 rounded-3" width="90%" height="600"
                    src="https://embed.windy.com/embed2.html?zoom=5&lat=33.312&lon=44.361&detailLat=33.312&detailLon=44.361&width=650&height=450&zoom=5&level=surface&overlay=gust&product=ecmwf&menu=&message=&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=default&metricTemp=default&radarRange=-1"
                    frameBorder="0"></iframe>
        </div>
    );
}