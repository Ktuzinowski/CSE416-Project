import { useState, useEffect } from "react";
import { getCurrentDistrictPlanSummary, getMmdEnsembleSummaryData } from "../../../axiosClient";
export const CurrentDistrictPlanSummary = ({ state }) => {
    const [currentDistrictPlanSummary, setCurrentDistrictPlanSummary] = useState(null);
    const [mmdsummaryData, setMMDSummaryData] = useState(null);

    useEffect(() => {
        const loadData = async (state) => {
            const data = await getCurrentDistrictPlanSummary(state);
            const data2 = await getMmdEnsembleSummaryData(state);
            console.log(data);
            setCurrentDistrictPlanSummary(data);
            setMMDSummaryData(data2);
        }
        if (state) {
            loadData(state);
        }
    }, [state])
    return (
        <h1>Current District Plan Summary</h1>
    )
}