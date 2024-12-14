import { useEffect, useState } from "react"
import { getSmdEnsembleSummaryData } from "../../../axiosClient"
import { getMmdEnsembleSummaryData } from "../../../axiosClient"
import { MmdSummaryAverageReps } from "../../../utils/Constants"


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
    
    if(summaryData != null){
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
                <b>Republican-Democratic Split</b>: {summaryData.average_republican_democratic_split[0].toFixed(2)}-
                {summaryData.average_republican_democratic_split[1].toFixed(2)}
                </p>

                
                </div>
            </div>
            
            <div style={{marginRight: "10px"}}>
                <h1 className="summarySMDHeader">MMD</h1>

                <div className="summaryData">
                <p><b>Number of Plans</b>: {mmdsummaryData.num_plans}</p>
                <p><b>Minority Representatives</b>: {mmdsummaryData.minority_reps}</p>
                <p><b>Average Republican Reps</b>: {MmdSummaryAverageReps.average_republican_representatives.toFixed(2)}</p>
                <p><b>Average Democratic Reps</b>: {MmdSummaryAverageReps.average_democratic_representatives.toFixed(2)}</p>
                <p><b>Republican Seat Share</b>: {mmdsummaryData.rep_share}%</p>
                <p><b>Democratic Seat Share</b>: {mmdsummaryData.dem_share}%</p>
                <p><b>Republican Vote Share</b>: {summaryData.republican_vote_share.toFixed(2)}%</p>
                <p><b>Democratic Vote Share</b>: {summaryData.democratic_vote_share.toFixed(2)}%</p>
                <p><b>Population Deviation</b>: {mmdsummaryData.pop_dev}%</p>
                <p>
                <b>Republican-Democratic Split</b>: {MmdSummaryAverageReps.average_republican_democratic_split[0].toFixed(2)}-
                {MmdSummaryAverageReps.average_republican_democratic_split[1].toFixed(2)}
                </p>
                <p><b>MMD Layout</b>: {mmdsummaryData.mmd_layout}</p>
                </div>
            </div>
    
            </div>

            
        )
    }
}