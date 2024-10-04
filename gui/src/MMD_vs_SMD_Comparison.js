import React, { useState } from 'react';
import SMDGraph from './SMDGraph.js'; // Import the SMD graph component
import MMDGraph from './MMDGraph'; // Import the MMD graph component

export const MMD_vs_SMD_Comparison = () => {
    const [selectedGraph, setSelectedGraph] = useState('SMD'); // Default to 'SMD'

    const renderGraph = () => {
        switch (selectedGraph) {
            case 'SMD':
                return <SMDGraph />;
            case 'MMD':
                return <MMDGraph />;
            case 'Compare':
                return (
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <div>
                            <h2>SMD Graph</h2>
                            <SMDGraph />
                        </div>
                        <div>
                            <h2>MMD Graph</h2>
                            <MMDGraph />
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div>
            <div>
                <button onClick={() => setSelectedGraph('SMD')}>SMD</button>
                <button onClick={() => setSelectedGraph('MMD')}>MMD</button>
                <button onClick={() => setSelectedGraph('Compare')}>Compare</button>
            </div>
            <div>
                {renderGraph()}
            </div>
        </div>
    );
};
