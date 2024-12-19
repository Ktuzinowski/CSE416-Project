import { useState, useEffect } from "react";
import { getSmdDistrictPlanElections, getMmdDistrictPlanSummary } from "../../../../axiosClient";

export const SmdElectionResults = ({ name, nameMmd }) => {
  const [electionData, setElectionData] = useState(null);
  const [mmdElectionData, setMmdElectionData] = useState(null);
  const [representatives, setRepresentatives] = useState("");

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
    const loadDataMmd = async (nameMmd) => {
      const data = await getMmdDistrictPlanSummary(nameMmd);
      setMmdElectionData(data);
      data["features"].forEach((feature) => {
        const electionWinners = feature.properties["election_data"]["elected"].map((winner) => {
          return winner[0] // get the name of the winner
      })
      var stringForElectionWinners = ""
      for (let i = 0; i < electionWinners.length; i++) {
          if (i == electionWinners.length - 1) {
          stringForElectionWinners += electionWinners[i]
          }
          else {
          stringForElectionWinners += electionWinners[i] + ", "
          }
      }
      setRepresentatives(stringForElectionWinners);

    })

  }
  loadDataMmd(nameMmd);
  }, [name, nameMmd]);

  const categories = [
    { label: "Vote Totals", key: (feature) => (feature.properties.republican + feature.properties.democrat).toLocaleString() },
    { label: "Republican", key: (feature) => feature.properties.republican.toLocaleString() },
    { label: "Democratic", key: (feature) => feature.properties.democrat.toLocaleString() },
    { label: "Representative", key: (feature) => feature.properties.representative },
    { label: "Incumbent Party", key: (feature) => feature.properties.incumbent },
    { label: "Loser", key: (feature) => feature.properties.loser },
    { label: "Loser-Party", key: (feature) => feature.properties.loser_party },
  ];

  const categoriesMmd = [
    { label: "Vote Totals", key: (feature) => (feature.properties.republican + feature.properties.democrat).toLocaleString() },
    { label: "Republican", key: (feature) => feature.properties.republican.toLocaleString() },
    { label: "Democratic", key: (feature) => feature.properties.democrat.toLocaleString() },
    { label: "Representatives", key: (feature) => {
      const electionWinners = feature.properties["election_data"]["elected"].map((winner) => {
          return winner[0] // get the name of the winner
      })
      var stringForElectionWinners = ""
      for (let i = 0; i < electionWinners.length; i++) {
          if (i == electionWinners.length - 1) {
          stringForElectionWinners += electionWinners[i]
          }
          else {
          stringForElectionWinners += electionWinners[i] + ", "
          }
      }
      return stringForElectionWinners;
    }},
    { label: "Incumbent Parties", key: (feature) => {
      const incumbentParties = feature.properties["election_data"]["elected"].map((winner) => {
        return winner[1] // get the name of the winner
      })
      var stringForIncumbentParties = ""
      for (let i = 0; i < incumbentParties.length; i++) {
          if (i == incumbentParties.length - 1) {
              stringForIncumbentParties += incumbentParties[i]
          }
          else {
              stringForIncumbentParties += incumbentParties[i] + ", "
          }
      }
      return stringForIncumbentParties;
    }},
    {
      label: "Winner Vote Totals", key: (feature) => {
        const winnerVoteTotals = feature.properties["election_data"]["elected"].map((winner) => {
          return {
            name: winner[0], // Assume winner[0] contains the representative's name
            votes: winner[2], // Assume winner[2] contains the vote total
          };
        });
        
        let stringForWinnerVoteTotals = "";
        
        for (let i = 0; i < winnerVoteTotals.length; i++) {
          const { name, votes } = winnerVoteTotals[i];
          if (i === winnerVoteTotals.length - 1) {
            stringForWinnerVoteTotals += `${name}: ${votes.toLocaleString()}`;
          } else {
            stringForWinnerVoteTotals += `${name}: ${votes.toLocaleString()} `;
          }
        }
        
        return stringForWinnerVoteTotals;        
      }
    },
    {
      label: "Losers", key: (feature) => {
        const electionLosers = feature.properties["election_data"]["losers"].map((loser) => {
          return loser[0] // get the name of the winner
      })
      var stringForElectionLosers = ""
      for (let i = 0; i < electionLosers.length; i++) {
          if (i == electionLosers.length - 1) {
            stringForElectionLosers += electionLosers[i]
          }
          else {
            stringForElectionLosers += electionLosers[i] + ", "
          }
      }
      return stringForElectionLosers;
      }
    },
    {
      label: "Loser-Parties", key: (feature) => {
        const loserParties = feature.properties["election_data"]["losers"].map((loser) => {
          return loser[1] // get the name of the winner
        })
        var stringForLoserParties = ""
        for (let i = 0; i < loserParties.length; i++) {
            if (i == loserParties.length - 1) {
              stringForLoserParties += loserParties[i]
            }
            else {
              stringForLoserParties += loserParties[i] + ", "
            }
        }
        return stringForLoserParties;
      }
    },
    {
      label: "Loser Vote Totals", key: (feature) => {
        const loserVoteTotals = feature.properties["election_data"]["losers"].map((loser) => {
          return {
            name: loser[0], // Assume winner[0] contains the representative's name
            votes: parseInt(loser[2], 10), // Assume winner[2] contains the vote total
          };
        });
        
        let stringForLoserVoteTotals = "";
        
        for (let i = 0; i < loserVoteTotals.length; i++) {
          const { name, votes } = loserVoteTotals[i];
          if (i === loserVoteTotals.length - 1) {
            stringForLoserVoteTotals += `${name}: ${votes.toLocaleString()}`;
          } else {
            stringForLoserVoteTotals += `${name}: ${votes.toLocaleString()} `;
          }
        }
        
        return stringForLoserVoteTotals;        
      }
    },
  ];

  if (!electionData || !mmdElectionData) {
    return <p>Loading...</p>;
  }

  return (

    <>
    <div className="supp">
      <p style={{fontSize: "15px", marginTop: "-25px"}}><b>Category SMD:</b> {electionData.interesting_description}</p>
    <p style={{fontSize: "15px"}}><b>Category MMD:</b> {mmdElectionData.interesting_description}</p>
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
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
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "5px", marginBottom: "15px", fontSize: "0.9rem" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid black", padding: "2px" }}>Category</th>
            {mmdElectionData.features.map((_, index) => (
              <th key={index} style={{ border: "1px solid black", padding: "2px" }}>District {index + 1}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {categoriesMmd.map((category, index) => (
            <tr key={index}>
              <td style={{ border: "1px solid black", padding: "2px" }}>{category.label}</td>
              {mmdElectionData.features.map((feature, featureIndex) => (
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
