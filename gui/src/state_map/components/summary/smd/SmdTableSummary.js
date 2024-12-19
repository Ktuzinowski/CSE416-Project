import { useEffect, useState } from "react";
import { getSmdDistrictPlanSummary, getMmdDistrictPlanSummary } from "../../../../axiosClient"

export const SmdTableSummary = ({ name, nameMmd }) => {
    const [summaryData, setSummaryData] = useState(null);
    const [mmdSummaryData, setMmdSummaryData] = useState(null);

    useEffect(() => {
        const loadSummaryData = async (name) => {
            const data = await getSmdDistrictPlanSummary(name);
            setSummaryData(data);
            console.log(data);
        } 
        if (name) {
            loadSummaryData(name);
        }
        console.log("MMD NAME", nameMmd)
        const loadSummaryMmdData = async (nameMmd) => {
            const data = await getMmdDistrictPlanSummary(nameMmd);
            setMmdSummaryData(data);
            console.log(data);
        }
        if (nameMmd) {
            loadSummaryMmdData(nameMmd);
        }
    }, [name, nameMmd])

    if (!summaryData || !mmdSummaryData) {
        return (
            <h1>Loading...</h1>
        )
    }
    return (
        <div className="summaryData">
            <p style={{fontSize: "18px"}}><b>Category</b>: {summaryData.interesting_description}</p>
            <table style={{ width: "95%", borderCollapse: "collapse" }}>
                <tbody>
                <tr>
                        <td style={{ border: "1px solid black", padding: "8px" }}><b>District Plan</b></td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>SMD</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>MMD</td>
                    </tr>
                    <tr>
                        <td style={{ border: "1px solid black", padding: "8px" }}><b>Number of Districts</b></td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>{summaryData.number_of_districts.toLocaleString()}</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>{mmdSummaryData.number_of_districts.toLocaleString()}</td>
                    </tr>
                    <tr>
                        <td style={{ border: "1px solid black", padding: "8px" }}><b>Opportunity District Threshold</b></td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>{summaryData.opportunity_district_threshold.toLocaleString()}</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>{mmdSummaryData.opportunity_district_threshold.toLocaleString()}</td>

                    </tr>
                    <tr>
                        <td style={{ border: "1px solid black", padding: "8px" }}><b>Opportunity Districts</b></td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>{summaryData.opportunity_districts.toLocaleString()}</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>{mmdSummaryData.opportunity_representatives.toLocaleString()}</td>

                    </tr>
                    <tr>
                        <td style={{ border: "1px solid black", padding: "8px" }}><b>Wasted Votes Democratic</b></td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>{summaryData.wasted_votes_democratic.toLocaleString()}</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>{mmdSummaryData.wasted_votes_democratic.toLocaleString()}</td>

                    </tr>
                    <tr>
                        <td style={{ border: "1px solid black", padding: "8px" }}><b>Wasted Votes Republican</b></td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>{summaryData.wasted_votes_republican.toLocaleString()}</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>{mmdSummaryData.wasted_votes_republican.toLocaleString()}</td>

                    </tr>
                    <tr>
                        <td style={{ border: "1px solid black", padding: "8px" }}><b>Safe District Threshold</b></td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>{summaryData.safe_district_threshold.toLocaleString()}</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>N/A</td>

                    </tr>
                    <tr>
                        <td style={{ border: "1px solid black", padding: "8px" }}><b>Safe Districts Republican</b></td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>{summaryData.safe_districts_republican.toLocaleString()}</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>N/A</td>

                    </tr>
                    <tr>
                        <td style={{ border: "1px solid black", padding: "8px" }}><b>Safe Districts Democratic</b></td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>{summaryData.safe_districts_democratic.toLocaleString()}</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>N/A</td>

                    </tr>
                    <tr>
                        <td style={{ border: "1px solid black", padding: "8px" }}><b>Republican-Democratic Split</b></td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>{`${(summaryData.republican_democratic_split * summaryData.number_of_districts).toFixed(2)}
                        - ${(summaryData.number_of_districts - summaryData.republican_democratic_split * summaryData.number_of_districts).toFixed(2)}`}</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>{`${(mmdSummaryData.republican_democratic_split * mmdSummaryData.number_of_districts).toFixed(2)}
                        - ${(mmdSummaryData.number_of_districts - mmdSummaryData.republican_democratic_split * mmdSummaryData.number_of_districts).toFixed(2)}`}</td>

                    </tr>
                    <tr>
                        <td style={{ border: "1px solid black", padding: "8px" }}><b>Election Used</b></td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>2020 Presidential Election</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>2020 Presidential Election</td>

                    </tr>
                </tbody>
            </table>
        </div>
    );
    
}