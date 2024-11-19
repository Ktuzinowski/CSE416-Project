import "./RightAnalysisPanel.css"
import "../App.css"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpandAlt, faCompressAlt } from '@fortawesome/free-solid-svg-icons';
import { RightAnalysisPanelOptions, RightAnalysisEnsembleOptions, RightAnalysisSearchOptions, RightAnalysisSummaryOptions } from "../utils/Constants";

export const RightAnalysisPanel = ({ setIsRightAnalysisPanelExpanded }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [ensembleSelected, setEnsembleSelected] = useState(false);
    const [summarySelected, setSummarySelected] = useState(false);
    const [searchSelected, setSearchSelected] = useState(false);
    const [compareSelected, setCompareSelected] = useState(false);

    const togglePanel = () => {
        setIsRightAnalysisPanelExpanded(!isExpanded);
        setIsExpanded(!isExpanded);
    }
    
    // Function to reset all selections and set the selected option
    const selectOption = (option) => {
        setEnsembleSelected(option === RightAnalysisPanelOptions.Ensemble);
        setSummarySelected(option === RightAnalysisPanelOptions.Summary);
        setSearchSelected(option === RightAnalysisPanelOptions.Search);
        setCompareSelected(option === RightAnalysisPanelOptions.Compare);
    }
    
    return (
        <div className="right_analysis_panel_container" style={{
            width: isExpanded ? "100%" : "auto", // Auto-width when collapsed
            maxWidth: isExpanded ? "100%" : "fit-content", // Fit the content naturally
            minWidth: "450px", // Set a minimum width for the panel
        }}>
            <div className="options_for_right_analysis_panel">
                    <div className="dropdown-button">
                        <button>Ensemble</button>
                    </div>
                    <div className="dropdown-menu">
                            {Object.keys(RightAnalysisEnsembleOptions).map((ensembleOption) => {
                                return (
                                    <p key={ensembleOption}>{ensembleOption}</p>
                                )
                            })}
                    </div>
                    <div className="dropdown-button">
                        <button>Search for District Plan</button>
                        <div className="dropdown-menu">
                            {Object.keys(RightAnalysisSearchOptions).map((ensembleOption) => {
                                return (
                                    <p key={ensembleOption}>{ensembleOption}</p>
                                )
                            })}
                        </div>
                    </div>
                    <div className="dropdown-button">
                        <button>Summary</button>
                        <div className="dropdown-menu">
                            {Object.keys(RightAnalysisSummaryOptions).map((ensembleOption) => {
                                return (
                                    <p key={ensembleOption}>{ensembleOption}</p>
                                )
                            })}
                        </div>
                    </div>
                </div>
            {/* <div className="left_data_panel_current_selection">
                <button className="right_data_expand_button" onClick={togglePanel}>
                    <FontAwesomeIcon icon={isExpanded ? faCompressAlt : faExpandAlt} />
                </button>
            </div> */}
        </div>
    )
}