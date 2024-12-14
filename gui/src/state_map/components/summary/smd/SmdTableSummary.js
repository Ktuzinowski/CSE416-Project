import { useEffect, useState } from "react";
import { getSmdDistrictPlanSummary } from "../../../../axiosClient"

export const SmdTableSummary = ({ name }) => {
    const [summaryData, setSummaryData] = useState(null);

    useEffect(() => {
        const loadSummaryData = async (name) => {
            const data = await getSmdDistrictPlanSummary(name);
            setSummaryData(data);
            console.log(data);
        } 
        if (name) {
            loadSummaryData(name);
        }
    }, [name])

    if (!summaryData) {
        return (
            <h1>Loading...</h1>
        )
    }
    return (
        <div className="summaryData">
            <p><b>Description</b>: {summaryData.interesting_description}</p>
            <p><b>Number of Districts</b>: {summaryData.number_of_districts.toLocaleString()}</p>
            
            <p><b>Opportunity District Threshold</b>: {summaryData.opportunity_district_threshold.toLocaleString()}</p>
            <p><b>Opportunity Districts</b>: {summaryData.opportunity_districts.toLocaleString()}</p>
            <p><b>Wasted Votes Democratic</b>: {summaryData.wasted_votes_democratic.toLocaleString()}</p>
            <p><b>Wasted Votes Republican</b>: {summaryData.wasted_votes_republican.toLocaleString()}</p>
            <p><b>Safe District Threshold</b>: {summaryData.safe_district_threshold.toLocaleString()}</p>
            <p><b>Safe Districts Republican</b>: {summaryData.safe_districts_republican.toLocaleString()}</p>
            <p><b>Safe Districts Democratic</b>: {summaryData.safe_districts_democratic.toLocaleString()}</p>
            <p><b>Republican-Democratic Split</b>: {`${summaryData.republican_democratic_split*summaryData.number_of_districts}-${summaryData.number_of_districts - summaryData.republican_democratic_split * summaryData.number_of_districts}`}</p>
            <p><b>Election Used</b>: {"2020 Presidential Election"}</p>
        </div>
    )
}