import { useEffect, useState } from "react"
import { getSmdEnsembleSummaryData } from "../../../axiosClient"
export const SummarySMD = ({ state }) => {
    const [summaryData, setSummaryData] = useState(null);

    useEffect(() => {
        const loadSummaryData = async (state) => {
            const data = await getSmdEnsembleSummaryData(state);
            setSummaryData(data);
            
        };
        loadSummaryData(state);
    }, [state])
    
    if(summaryData != null){
        return (
            <>
    
            <h1 className="summarySMDHeader">Summary SMD</h1>
    
            <div className="summaryData">
            <p>State: {summaryData.state.charAt(0).toUpperCase() + summaryData.state.slice(1)}</p>
            <p>Number of Plans: {summaryData.num_plans}</p>
            <p>Minority Representatives: {summaryData.minority_reps}</p>
            <p>Population Deviation: {summaryData.pop_dev}</p>
            <p>Republican Share: {summaryData.rep_share}%</p>
            <p>Democratic Share: {summaryData.dem_share}%</p>
            
            </div>
    
            </>
        )
    }
}