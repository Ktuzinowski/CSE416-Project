import { useState } from "react";
import { VisualizationSmdSummaryOptions } from "../../../utils/Constants";
import { SmdTableSummary } from "./smd/SmdTableSummary";
import { SmdElectionResults } from "./smd/SmdElectionResults";
import { SmdSeatVoteSharePlot } from "./smd/SmdSeatVoteSharePlot";
export const SmdDistrictPlanSummary = ({ name, nameMmd }) => {
    const [currentVisualization, setCurrentVisualization] = useState(VisualizationSmdSummaryOptions.Summary);

    return (
        <>
            <div className="right_data_panel_current_selection" style={{marginBottom: "-5px"}}>
                <h2 className="right_data_panel_title">{`SMD/MMD Summary`}</h2>
                <select 
                value={currentVisualization}
                onChange={(e) => setCurrentVisualization(e.target.value)}
                style={{marginLeft: "10px", fontSize: "15px", padding: "1px", marginRight: "10px"}}                >
                    {Object.keys(VisualizationSmdSummaryOptions).map((option) => {
                        return (
                            <option key={option}>
                                {VisualizationSmdSummaryOptions[option]}
                            </option>
                        )
                    })}
                </select>
            </div>
            <div>
</div>
            {
                currentVisualization === VisualizationSmdSummaryOptions.Summary ? (
                    <SmdTableSummary name={name} nameMmd={nameMmd} />
                ) :
                currentVisualization === VisualizationSmdSummaryOptions.ElectionResults ? (
                    <SmdElectionResults name={name} nameMmd={nameMmd} />
                ) :
                (
                    <SmdSeatVoteSharePlot name={name} />
                )
            }
        </>
    )
}