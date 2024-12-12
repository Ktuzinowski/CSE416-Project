import { useEffect, useState } from "react"
import { getMmdEnsembleSummaryData } from "../../../axiosClient"
export const SummaryMMD = ({ state }) => {
    const [summaryData, setSummaryData] = useState(null);

    useEffect(() => {
        const loadSummaryData = async (state) => {
            const data = await getMmdEnsembleSummaryData(state);
            setSummaryData(data);
            console.log(data);
        };
        loadSummaryData(state);
    }, [state])

    if(summaryData != null){
        return (
            <>
    
            <h1 className="summarySMDHeader">Summary MMD</h1>
    
            <div className="summaryData">
            <p>State: {summaryData.state.charAt(0).toUpperCase() + summaryData.state.slice(1)}</p>
            <p>Number of Plans: {summaryData.num_plans}</p>
            <p>Minority Representatives: {summaryData.minority_reps}</p>
            <p>Population Deviation: {summaryData.pop_dev}</p>
            <p>Republican Share: {summaryData.rep_share}%</p>
            <p>Democratic Share: {summaryData.dem_share}%</p>
            <p>MMD Layout: {summaryData.mmd_layout}</p>
            
            </div>
    
            </>
        )
    }
}