import { useState } from "react";
import { Summary } from "./Summary";
import { BoxAndWhiskerSMD } from "./BoxAndWhiskerSMD";
import { BarChart } from "./BarChart";
import { BoxAndWhiskerMMD } from "./BoxAndWhiskerMMD";
import { VisualizationEnsembleOptions } from "../../../utils/Constants";

export const Ensemble = ({ state }) => {
    const [currentVisualization, setCurrentVisualization] = useState(VisualizationEnsembleOptions.Summary);

    return (
        <div>
            <div className="right_data_panel_current_selection">
                <h2 className="right_data_panel_title">{`Ensemble ${state.charAt(0).toUpperCase() + state.slice(1)}`}</h2>
                <select 
                value={currentVisualization}
                onChange={(e) => setCurrentVisualization(e.target.value)}
                style={{marginLeft: "10px", fontSize: "15px", padding: "1px", marginRight: "10px"}}                >
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
                <Summary state={state} />
            )}
            {currentVisualization === VisualizationEnsembleOptions.BarChart && (
                <BarChart state={state}/>
            )}
            {currentVisualization === VisualizationEnsembleOptions.BoxAndWhisker && (
                <BoxAndWhiskerSMD state={state} />
            )}
            {currentVisualization === VisualizationEnsembleOptions.BoxAndWhisker && (
                <BoxAndWhiskerMMD state={state}/>
            )}
        </div>
    )
}