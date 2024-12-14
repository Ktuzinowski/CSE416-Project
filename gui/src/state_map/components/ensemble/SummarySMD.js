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
            <div style={{display: "flex", flexDirection: "row"}}>
            <div>
                <h1 className="summarySMDHeader">SMD</h1>
        
                <div className="summaryData">
                <p>Number of Plans: {summaryData.number_of_plans}</p>
                <p>Minority Representatives: {summaryData.minority_representatives}</p>
                <p>Average Republican Reps: {summaryData.average_republican_representatives.toFixed(2)}</p>
                <p>Average Democratic Reps: {summaryData.average_democratic_representatives.toFixed(2)}</p>
                <p>Republican Seat Share: {summaryData.republican_seat_share.toFixed(2)}%</p>
                <p>Democratic Seat Share: {summaryData.democratic_seat_share.toFixed(2)}%</p>
                <p>Republican Vote Share: {summaryData.republican_vote_share.toFixed(2)}%</p>
                <p>Democratic Vote Share: {summaryData.democratic_vote_share.toFixed(2)}%</p>
                <p>Population Deviation: {summaryData.population_deviation.toFixed(2)}%</p>
                <p>
                Republican/Democratic Split: {summaryData.average_republican_democratic_split[0].toFixed(2)}-
                {summaryData.average_republican_democratic_split[1].toFixed(2)}
                </p>

                
                </div>
            </div>
            
            <div>
                <h1 className="summarySMDHeader">MMD</h1>

                <div className="summaryData">
                <p>Number of Plans: {mmdsummaryData.num_plans}</p>
                <p>Minority Representatives: {mmdsummaryData.minority_reps}</p>
                <p>Population Deviation: {mmdsummaryData.pop_dev}%</p>
                <p>Republican Share: {mmdsummaryData.rep_share}%</p>
                <p>Democratic Share: {mmdsummaryData.dem_share}%</p>
                <p>MMD Layout: {mmdsummaryData.mmd_layout}</p>
                
                </div>
            </div>
    
            </div>

            
        )
    }
}