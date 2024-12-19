import { useState, useEffect } from "react";
import { getSmdDistrictPlanElections } from "../../../../axiosClient";
import { mmdElectionResults } from "../../../../utils/Constants";


export const SmdElectionResults = ({ name, nameMmd }) => {
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

  const categories = [
    { label: "Vote Totals", key: (feature) => (feature.properties.republican + feature.properties.democrat).toLocaleString() },
    { label: "Republican", key: (feature) => feature.properties.republican.toLocaleString() },
    { label: "Democratic", key: (feature) => feature.properties.democrat.toLocaleString() },
    { label: "Representative", key: (feature) => feature.properties.representative },
    { label: "Incumbent Party", key: (feature) => feature.properties.incumbent },
    { label: "Loser", key: (feature) => feature.properties.loser },
    { label: "Loser-Party", key: (feature) => feature.properties.loser_party },
  ];

  return (

    <>
    <div className="supp">
    <p style={{fontSize: "15px"}}><b>Category:</b> {electionData.interesting_description}</p>
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th style={{ border: "1px solid black", padding: "2px" }}>Category</th>
          {electionData.features.map((_, index) => (
            <th key={index} style={{ border: "1px solid black", padding: "2px" }}>District {index + 1}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {categories.map((category, index) => (
          <tr key={index}>
            <td style={{ border: "1px solid black", padding: "2px" }}>{category.label}</td>
            {electionData.features.map((feature, featureIndex) => (
              <td key={featureIndex} style={{ border: "1px solid black", padding: "2px" }}>{category.key(feature)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
    
 
    </>

    



  );
};
