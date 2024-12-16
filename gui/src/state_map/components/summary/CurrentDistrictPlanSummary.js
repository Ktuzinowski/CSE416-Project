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
            console.log("mmd stuff")
            console.log(data2)
            setCurrentDistrictPlanSummary(data);
            setMMDSummaryData(data2);
        };
        if (state) {
            loadData(state);
        }
    }, [state]);

    if (!currentDistrictPlanSummary) {
        return <p>Loading...</p>;
    }

    return (
        <div style={{margin: "10px"}}>
            <h1>Current vs. Average MMD Plan</h1>
            <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px" }}>
                <thead>
                    <tr>
                        <th style={{ border: "1px solid black", padding: "8px" }}>Category</th>
                        <th style={{ border: "1px solid black", padding: "8px" }}>SMD</th>
                        <th style={{ border: "1px solid black", padding: "8px" }}>MMD</th>
                    </tr>
                </thead>
                <tbody>
                    
                    <tr>
                        <td style={{ border: "1px solid black", padding: "8px" }}>Opportunity Representatives</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>{currentDistrictPlanSummary.opportunity_districts}</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>{mmdsummaryData.minority_representatives}</td>
                    </tr>
                    <tr>
                        <td style={{ border: "1px solid black", padding: "8px" }}>Republican-Democratic Split</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>
                            {`${(currentDistrictPlanSummary.republican_democratic_split * currentDistrictPlanSummary.number_of_districts)} - ${(currentDistrictPlanSummary.number_of_districts - currentDistrictPlanSummary.republican_democratic_split * currentDistrictPlanSummary.number_of_districts)}`}
                        </td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>
                            {`${mmdsummaryData.average_republican_democratic_split[0]} - ${mmdsummaryData.average_republican_democratic_split[1]}`}
                        </td>
                    </tr>
                    <tr>
                        <td style={{ border: "1px solid black", padding: "8px" }}>Republican Vote Share</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>{mmdsummaryData.republican_vote_share.toFixed(2)}%</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>{mmdsummaryData.republican_vote_share.toFixed(2)}%</td>
                    </tr>
                    <tr>
                        <td style={{ border: "1px solid black", padding: "8px" }}>Democratic Vote Share</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>{mmdsummaryData.democratic_vote_share.toFixed(2)}%</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>{mmdsummaryData.democratic_vote_share.toFixed(2)}%</td>
                    </tr>
                    <tr>
                        <td style={{ border: "1px solid black", padding: "8px" }}>Republican Seat Share</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>{`${currentDistrictPlanSummary.republican_democratic_split * 100}`}%</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>{(mmdsummaryData.republican_seat_share * 100).toFixed(2)}%</td>
                    </tr>
                    <tr>
                        <td style={{ border: "1px solid black", padding: "8px" }}>Democratic Seat Share</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>{`${100 - currentDistrictPlanSummary.republican_democratic_split * 100}`}%</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>{(mmdsummaryData.democratic_seat_share * 100).toFixed(2)}%</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
    
    
};
