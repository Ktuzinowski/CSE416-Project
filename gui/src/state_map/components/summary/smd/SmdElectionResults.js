import { useState, useEffect } from "react";
import { getSmdDistrictPlanElections } from "../../../../axiosClient";

export const SmdElectionResults = ({ name }) => {
    const [electionData, setElectionData] = useState(null);

    useEffect(() => {
        const loadData = async (name) => {
            console.log(name);
            const data = await getSmdDistrictPlanElections(name);
            console.log(data);
            setElectionData(data);
        }
        if (name) {
            loadData(name);
        }
    }, [name])
    return (
        <h1>Smd Election Results</h1>
    )
}