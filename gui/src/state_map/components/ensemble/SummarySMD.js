import { useEffect, useState } from "react"
import { getSmdEnsembleSummaryData } from "../../../axiosClient"
export const SummarySMD = ({ state }) => {
    const [summaryData, setSummaryData] = useState(null);

    useEffect(() => {
        const loadSummaryData = async (state) => {
            const data = await getSmdEnsembleSummaryData(state);
            setSummaryData(data);
            console.log(data);
        };
        loadSummaryData(state);
    }, [state])
    
    return (
        <h1>Summary SMD</h1>
    )
}