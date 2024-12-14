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
    };
    if (name) {
      loadData(name);
    }
  }, [name]);

  if (!electionData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="supp" style={{marginTop: "-25px"}}>
      <p><b>Interesting Description:</b> {electionData.interesting_description}</p>
      <div className="grid-container">
        {electionData.features.map((feature, index) => (
          <div key={index} className="card2">
            <h3>District {index + 1}</h3>
            <p>
            <b>Vote Totals</b>: {(feature.properties.republican + feature.properties.democrat).toLocaleString()}
            </p>     
            <p><b>Republican</b>: {feature.properties.republican.toLocaleString()}</p>    
            <p><b>Democratic</b>: {feature.properties.democrat.toLocaleString()}</p>      
            <p><b>Representative</b>: {feature.properties.representative}</p>
            <p><b>Incumbent Party</b>: {feature.properties.incumbent}</p>
            <p><b>Loser</b>: {feature.properties.loser}</p>
            <p><b>Loser-Party</b>: {feature.properties.loser_party}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
