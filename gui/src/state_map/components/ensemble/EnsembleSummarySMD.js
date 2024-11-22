import { BoxAndWhiskerPlotSMD } from "./BoxAndWhiskerPlotSMD"
import { VisualizationEnsembleOptions } from "../../../utils/Constants";

export const EnsembleSummarySMD = ({ state }) => {
    return (
        <div>
            <div className="left_data_panel_current_selection">
                <h2 className="left_data_panel_title">SMD Ensemble Utah</h2>
                <select style={{marginLeft: "10px", fontSize: "15px", padding: "1px", marginRight: "10px"}}                >
                    {Object.keys(VisualizationEnsembleOptions).map((option) => {
                        return (
                            <option key={option}>
                                {VisualizationEnsembleOptions[option]}
                            </option>
                        )
                    })}
                </select>
            </div>
            <BoxAndWhiskerPlotSMD state={state} />
        </div>
    )
}