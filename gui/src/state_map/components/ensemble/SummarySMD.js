import { useEffect, useState } from "react"
import { getSmdEnsembleSummaryData } from "../../../axiosClient"
import { getMmdEnsembleSummaryData } from "../../../axiosClient"


export const SummarySMD = ({ state }) => {
    const [summaryData, setSummaryData] = useState(null);
    const [mmdsummaryData, setMMDSummaryData] = useState(null);

    useEffect(() => {
        const loadSummaryData = async (state) => {
            const data = await getSmdEnsembleSummaryData(state);
            const data2 = await getMmdEnsembleSummaryData(state);

            setSummaryData(data);
            setMMDSummaryData(data2);
            
        };
        loadSummaryData(state);
    }, [state])
    
    if(summaryData != null){
        return (
            <>
    
            <h1 className="summarySMDHeader">Summary SMD</h1>
    
            <div className="summaryData">
            <p>Number of Plans: {summaryData.num_plans}</p>
            <p>Minority Representatives: {summaryData.minority_reps}</p>
            <p>Population Deviation: {summaryData.pop_dev}%</p>
            <p>Republican Share: {summaryData.rep_share}%</p>
            <p>Democratic Share: {summaryData.dem_share}%</p>
            
            </div>

            <h1 className="summarySMDHeader">Summary MMD</h1>

            <div className="summaryData">
            <p>Number of Plans: {mmdsummaryData.num_plans}</p>
            <p>Minority Representatives: {mmdsummaryData.minority_reps}</p>
            <p>Population Deviation: {mmdsummaryData.pop_dev}%</p>
            <p>Republican Share: {mmdsummaryData.rep_share}%</p>
            <p>Democratic Share: {mmdsummaryData.dem_share}%</p>
            <p>MMD Layout: {mmdsummaryData.mmd_layout}</p>
            
            </div>
    
            </>

            
        )
    }
}