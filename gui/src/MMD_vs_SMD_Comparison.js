import React, { useState, useEffect } from 'react';
import { SMDBarChartGraph } from './SMDBarChartGraph';
import { MMDBarChartGraph } from './MMDBarChartGraph';

export const MMD_vs_SMD_Comparison = ({ data }) => {
    const [selectedGraph, setSelectedGraph] = useState('SMD'); // Default to 'SMD'
    const [dataForSMD, setDataForSMD] = useState(null);

    useEffect(() => {
        if (data !== null) {
            setDataForSMD(data)
        }
    }, [data])

    const renderGraph = () => {
        switch (selectedGraph) {
            case 'SMD':
                return (
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <SMDBarChartGraph data={dataForSMD}/>
                    </div>
                );
            case 'MMD':
                return (
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <MMDBarChartGraph />
                    </div>
                );
            case 'Compare':
                return (
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <div>
                            <SMDBarChartGraph data={dataForSMD} />
                        </div>
                        <div>
                            <MMDBarChartGraph data={dataForSMD} />
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
                <button className={selectedGraph === "SMD" ? "mmd_smd_selection_button_selected" : "mmd_smd_selection_button"} style={{marginLeft: "10px"}} onClick={() => setSelectedGraph('SMD')}>SMD</button>
                <button className={selectedGraph === "MMD" ? "mmd_smd_selection_button_selected" : "mmd_smd_selection_button"} style={{borderRight: "0px", borderLeft: "0px"}}onClick={() => setSelectedGraph('MMD')}>MMD</button>
                <button className={selectedGraph === "Compare" ? "mmd_smd_selection_button_selected" : "mmd_smd_selection_button"} onClick={() => setSelectedGraph('Compare')}>Compare</button>
            </div>
            <div>
                {renderGraph()}
            </div>
        </div>
    );
};
