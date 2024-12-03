import { useState } from "react";
import { SummaryMMD } from "./SummaryMMD";
import { BarChartMMD } from "./BarChartMMD";
import { BoxAndWhiskerMMD } from "./BoxAndWhiskerMMD";
import { VisualizationEnsembleOptions } from "../../../utils/Constants";

export const EnsembleMMD = ({ state }) => {
    const [currentVisualization, setCurrentVisualization] = useState(VisualizationEnsembleOptions.Summary);
    return (
        <div>
            <div className="left_data_panel_current_selection">
                <h2 className="left_data_panel_title">MMD Ensemble Utah</h2>
                <select 
                    value={currentVisualization} 
                    onChange={(e) => setCurrentVisualization(e.target.value)}
                    style={{marginLeft: "10px", fontSize: "15px", padding: "1px", marginRight: "10px"}}
                >
                    {Object.keys(VisualizationEnsembleOptions).map((option) => {
                        return (
                            <option key={option}>
                                {VisualizationEnsembleOptions[option]}
                            </option>
                        )
                    })}
                </select>
            </div>
            {currentVisualization === VisualizationEnsembleOptions.Summary && (
                <SummaryMMD state={state}/>
            )}
            {currentVisualization === VisualizationEnsembleOptions.BarChart && (
                <BarChartMMD state={state}/>
            )}
            {currentVisualization === VisualizationEnsembleOptions.BoxAndWhisker && (
                <BoxAndWhiskerMMD state={state}/>
            )}
        </div>
    )
}