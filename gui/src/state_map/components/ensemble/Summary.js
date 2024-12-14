import { useEffect, useState } from "react"
import { getSmdEnsembleSummaryData } from "../../../axiosClient"
import { getMmdEnsembleSummaryData } from "../../../axiosClient"

export const Summary = ({ state }) => {
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
    
    if(summaryData != null && mmdsummaryData != null){
        return (
            <div style={{display: "flex", flexDirection: "row"}}>
            <div>
                <h1 className="summarySMDHeader">SMD</h1>
        
                <div className="summaryData">
                <p><b>Number of Plans</b>: {summaryData.number_of_plans}</p>
                <p><b>Minority Representatives</b>: {summaryData.minority_representatives}</p>
                <p><b>Average Republican Reps</b>: {summaryData.average_republican_representatives.toFixed(2)}</p>
                <p><b>Average Democratic Reps</b>: {summaryData.average_democratic_representatives.toFixed(2)}</p>
                <p><b>Republican Seat Share</b>: {(summaryData.republican_seat_share * 100).toFixed(2)}%</p>
                <p><b>Democratic Seat Share</b>: {(summaryData.democratic_seat_share * 100).toFixed(2)}%</p>
                <p><b>Republican Vote Share</b>: {summaryData.republican_vote_share.toFixed(2)}%</p>
                <p><b>Democratic Vote Share</b>: {summaryData.democratic_vote_share.toFixed(2)}%</p>
                <p><b>Population Deviation</b>: {summaryData.population_deviation.toFixed(2)}%</p>
                <p>
                <b>Republican-Democratic Split</b>: 
                {summaryData.average_republican_democratic_split[0].toFixed(2)}-
                {summaryData.average_republican_democratic_split[1].toFixed(2)}
                </p>

                
                </div>
            </div>
            
            <div style={{marginRight: "10px"}}>
                <h1 className="summarySMDHeader">MMD</h1>

                <div className="summaryData">
                <p><b>Number of Plans</b>: {mmdsummaryData.number_of_plans}</p>
                <p><b>Minority Representatives</b>: {mmdsummaryData.minority_representatives}</p>

                <p><b>Average Republican Reps</b>: {mmdsummaryData.average_republican_representatives}</p>
                <p><b>Average Democratic Reps</b>: {mmdsummaryData.average_democratic_representatives}</p>
                <p><b>Republican Seat Share</b>: {(mmdsummaryData.republican_seat_share * 100).toFixed(2)}%</p>
                <p><b>Democratic Seat Share</b>: {(mmdsummaryData.democratic_seat_share * 100).toFixed(2)}%</p>
                <p><b>Republican Vote Share</b>: {mmdsummaryData.republican_vote_share.toFixed(2)}%</p>
                <p><b>Democratic Vote Share</b>: {mmdsummaryData.democratic_vote_share.toFixed(2)}%</p>
                <p><b>Population Deviation</b>: {mmdsummaryData.population_deviation.toFixed(2)}%</p>
                <p>
                <b>Republican-Democratic Split</b>: 
                {mmdsummaryData.average_republican_democratic_split[0].toFixed(2)}-
                {mmdsummaryData.average_republican_democratic_split[1].toFixed(2)}
                </p>

                <p><b>MMD Layout</b>: {mmdsummaryData.mmd_layout}</p>
                </div>
            </div>
    
            </div>

            
        )
    }
}