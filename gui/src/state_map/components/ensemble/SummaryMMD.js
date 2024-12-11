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
    return (
        <h1>Summary MMD</h1>
    )
}