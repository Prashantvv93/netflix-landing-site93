import React from 'react';
import './SkeletonLoader.css';

const SkeletonLoader = ({ type }) => {
    const counter = Array(5).fill(1); // Show 5 skeletons

    if (type === "poster") {
        return (
            <div className="skeleton-row">
                {counter.map((_, i) => (
                    <div key={i} className="skeleton-poster"></div>
                ))}
            </div>
        );
    }

    if (type === "banner") {
        return <div className="skeleton-banner"></div>;
    }

    return (
        <div className="skeleton-row">
            {counter.map((_, i) => (
                <div key={i} className="skeleton-card"></div>
            ))}
        </div>
    );
};

export default SkeletonLoader;
