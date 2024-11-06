import "./RightAnalysisPanel.css"
import "../App.css"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpandAlt, faCompressAlt } from '@fortawesome/free-solid-svg-icons';

export const RightAnalysisPanel = ({ setIsRightAnalysisPanelExpanded }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const togglePanel = () => {
        setIsRightAnalysisPanelExpanded(!isExpanded);
        setIsExpanded(!isExpanded);
    }
    return (
        <div className="right_analysis_panel_container" style={{
            width: isExpanded ? "100%" : "auto", // Auto-width when collapsed
            maxWidth: isExpanded ? "100%" : "fit-content", // Fit the content naturally
            minWidth: "350px", // Set a minimum width for the panel
        }}>
            <div className="left_data_panel_current_selection">
                <h2 className="left_data_panel_title">Summary</h2>
                <button className="left_data_expand_button" onClick={togglePanel}>
                    <FontAwesomeIcon icon={isExpanded ? faCompressAlt : faExpandAlt} />
                </button>
            </div>
        </div>
    )
}