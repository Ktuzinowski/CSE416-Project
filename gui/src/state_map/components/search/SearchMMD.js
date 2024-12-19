import { useEffect, useState } from "react";
import { getMmdDistrictPlansSummaries } from "../../../axiosClient"

export const SearchMMD = ({ state, setCurrentMmdDistrict, handleNewMmdDistrictSelection }) => {
    const [summaries, setSummaries] = useState(null);
    useEffect(() => {
        const loadSummaryData = async (state) => {
            const data = await getMmdDistrictPlansSummaries(state);
            setSummaries(data);
        }
        loadSummaryData(state);
    }, [state])
    return  (<div>
        <div className="right_data_panel_current_selection">
            <h2 className="right_data_panel_title">{`MMD Search ${state.charAt(0).toUpperCase() + state.slice(1)}`}</h2>
        </div>
        <div style={{ display: "flex", marginLeft: "30px" }}>
        {/* Render the grid if summaries are available */}
        {summaries && (
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)", // Always 2 columns
                    gap: "15px",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%", // Ensures the grid spans full available width
                    maxWidth: "100%", // Optional: Limits the total width of the grid
                }}
            >
                {summaries.map((summary, index) => (
                    <div
                        key={index}
                        className="card"
                        onClick={() => {
                                setCurrentMmdDistrict(summary.name)
                                handleNewMmdDistrictSelection()
                            }
                        }
                    >
                        <p>{summary.interesting_description}</p>
                    </div>
                ))}
            </div>
        )}
        </div>
    
    </div>
    );
}