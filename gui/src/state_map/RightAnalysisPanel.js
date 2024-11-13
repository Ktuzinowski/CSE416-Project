import "./RightAnalysisPanel.css"
import "../App.css"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpandAlt, faCompressAlt } from '@fortawesome/free-solid-svg-icons';
import { RightAnalysisPanelOptions, EnsembleDropdownOptions, SearchDropdownOptions, SummaryDropdownOptions } from "../utils/Constants";
import { RightAnalysisDropdown } from "./components/RightAnalysisDropdown";

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
                        <div className="dropdown-menu">
                            <p>Option 1</p>
                            <p>Option 2</p>
                            <p>Option 3</p>
                        </div>
                    </div>
                    <div className="dropdown-button">
                        <button>Summary</button>
                        <div className="dropdown-menu">
                            <p>Option A</p>
                            <p>Option B</p>
                            <p>Option C</p>
                        </div>
                    </div>
                    <div className="dropdown-button">
                        <button>Search</button>
                        <div className="dropdown-menu">
                            <p>Option X</p>
                            <p>Option Y</p>
                            <p>Option Z</p>
                        </div>
                    </div>
                    <div className="dropdown-button">
                        <button>Compare</button>
                        {/* No dropdown for "Compare" */}
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