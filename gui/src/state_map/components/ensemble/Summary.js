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
    
    if (summaryData != null && mmdsummaryData != null) {
        return (
            <table style={{ width: "95%", borderCollapse: "collapse", marginLeft: "15px" }}>
                <thead>
                    <tr>
                        <th style={{ border: "1px solid black", padding: "8px" }}>Category</th>
                        <th style={{ border: "1px solid black", padding: "8px" }}>SMD</th>
                        <th style={{ border: "1px solid black", padding: "8px" }}>MMD</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{ border: "1px solid black", padding: "8px" }}>Number of Plans</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>{summaryData.number_of_plans}</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>{mmdsummaryData.number_of_plans}</td>
                    </tr>
                    <tr>
                        <td style={{ border: "1px solid black", padding: "8px" }}>Minority Representatives</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>{summaryData.minority_representatives}</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>{mmdsummaryData.minority_representatives}</td>
                    </tr>
                    <tr>
                        <td style={{ border: "1px solid black", padding: "8px" }}>Average Republican Reps.</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>{summaryData.average_republican_representatives.toFixed(2)}</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>{mmdsummaryData.average_republican_representatives.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td style={{ border: "1px solid black", padding: "8px" }}>Average Democratic Reps.</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>{summaryData.average_democratic_representatives.toFixed(2)}</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>{mmdsummaryData.average_democratic_representatives.toFixed(2)}</td>
                    </tr>
                    <tr>
                        <td style={{ border: "1px solid black", padding: "8px" }}>Republican Seat Share</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>{(summaryData.republican_seat_share * 100).toFixed(2)}%</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>{(mmdsummaryData.republican_seat_share * 100).toFixed(2)}%</td>
                    </tr>
                    <tr>
                        <td style={{ border: "1px solid black", padding: "8px" }}>Democratic Seat Share</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>{(summaryData.democratic_seat_share * 100).toFixed(2)}%</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>{(mmdsummaryData.democratic_seat_share * 100).toFixed(2)}%</td>
                    </tr>
                    <tr>
                        <td style={{ border: "1px solid black", padding: "8px" }}>Republican Vote Share</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>{summaryData.republican_vote_share.toFixed(2)}%</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>{mmdsummaryData.republican_vote_share.toFixed(2)}%</td>
                    </tr>
                    <tr>
                        <td style={{ border: "1px solid black", padding: "8px" }}>Democratic Vote Share</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>{summaryData.democratic_vote_share.toFixed(2)}%</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>{mmdsummaryData.democratic_vote_share.toFixed(2)}%</td>
                    </tr>
                    <tr>
                        <td style={{ border: "1px solid black", padding: "8px" }}>Population Deviation</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>{summaryData.population_deviation.toFixed(2)}%</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>{mmdsummaryData.population_deviation.toFixed(2)}%</td>
                    </tr>
                    <tr>
                        <td style={{ border: "1px solid black", padding: "8px" }}>Republican-Democratic Split</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>
                            {summaryData.average_republican_democratic_split[0].toFixed(2)} - {summaryData.average_republican_democratic_split[1].toFixed(2)}
                        </td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>
                            {mmdsummaryData.average_republican_democratic_split[0].toFixed(2)} - {mmdsummaryData.average_republican_democratic_split[1].toFixed(2)}
                        </td>
                    </tr>
                    <tr>
                        <td style={{ border: "1px solid black", padding: "8px" }}>MMD Layout</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>N/A</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>
                        {mmdsummaryData.mmd_layout.join('-')}
                        </td>                   
                        </tr>
                </tbody>
            </table>
        );
    }
    
}