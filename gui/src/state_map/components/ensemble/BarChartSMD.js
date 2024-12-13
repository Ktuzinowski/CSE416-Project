import React, { useEffect, useState } from 'react';
import { OpportunityRepresentativeJSON } from "../../../utils/Constants";
import { getSmdEnsembleSummaryData } from "../../../axiosClient";

export const BarChartSMD = ({ state }) => {
    const [summaryData, setSummaryData] = useState(null);

    useEffect(() => {
        const loadSummaryData = async () => {
            try {
                const data = await getSmdEnsembleSummaryData(state);
                setSummaryData(data);
                console.log(data);
            } catch (error) {
                console.error("Error fetching summary data:", error);
            }
        };
        loadSummaryData();
    }, [state]);

    
    return (
        <div>
            <h1 className="summarySMDHeader">SMD Range of Representatives</h1>
           
        </div>
    );
};

export default BarChartSMD;