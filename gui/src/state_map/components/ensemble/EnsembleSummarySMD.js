import { BoxAndWhiskerPlotSMD } from "./BoxAndWhiskerPlotSMD"
export const EnsembleSummarySMD = ({ state }) => {
    return (
        <div>
            <div className="left_data_panel_current_selection">
                <h2 className="left_data_panel_title">SMD Ensemble Utah</h2>
            </div>
            <BoxAndWhiskerPlotSMD state={state} />
        </div>
    )
}