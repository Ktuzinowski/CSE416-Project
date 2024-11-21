import { BoxAndWhiskerPlotMMD } from "./BoxAndWhiskerPlotMMD"
export const EnsembleSummaryMMD = ({ state }) => {
    return (
        <div>
            <div className="left_data_panel_current_selection">
                <h2 className="left_data_panel_title">MMD Ensemble Utah</h2>
            </div>
            <BoxAndWhiskerPlotMMD state={state}/>
        </div>
    )
}