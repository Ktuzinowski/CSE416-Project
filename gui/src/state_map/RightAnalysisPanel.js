import "./RightAnalysisPanel.css"
import "../App.css"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpandAlt, faCompressAlt } from '@fortawesome/free-solid-svg-icons';
import { RightAnalysisPanelOptions, RightAnalysisEnsembleOptions, RightAnalysisSearchOptions, RightAnalysisSummaryOptions } from "../utils/Constants";
import { EnsembleSummarySMD } from "./components/ensemble/EnsembleSummarySMD";
import { EnsembleSummaryMMD } from "./components/ensemble/EnsembleSummaryMMD";
import { EnsembleSummaryCompare } from "./components/ensemble/EnsembleSummaryCompare";

export const RightAnalysisPanel = ({ state, setIsRightAnalysisPanelExpanded }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [hoverOverEnsemble, setHoverOverEnsemble] = useState(false);
    const [hoverOverSearch, setHoverOverSearch] = useState(false);
    const [hoverOverSummary, setHoverOverSummary] = useState(false);
    // State variables to keep track of the screen that is being selected
    const [ensembleSelected, setEnsembleSelected] = useState(false);
    const [searchSelected, setSearchSelected] = useState(false);
    const [summarySelected, setSummarySelected] = useState(false);
    // Create state variables to keep track of the currently selected option
    const [ensembleOptionSelected, setEnsembleOptionSelected] = useState(RightAnalysisEnsembleOptions.SMD);
    const [searchOptionSelected, setSearchOptionSelected] = useState(RightAnalysisSearchOptions.SMD);
    const [summaryOptionSelected, setSummaryOptionSelected] = useState(RightAnalysisSummaryOptions.SMD);

    const togglePanel = () => {
        setIsRightAnalysisPanelExpanded(!isExpanded);
        setIsExpanded(!isExpanded);
    }
    
    // Function to reset all selections and set the selected option
    const handleHoverOverOption = (option) => {
        setHoverOverEnsemble(option === RightAnalysisPanelOptions.Ensemble);
        setHoverOverSearch(option === RightAnalysisPanelOptions.Search);
        setHoverOverSummary(option === RightAnalysisPanelOptions.Summary);
    }

    const handleSelectOption = (option) => {
        setEnsembleSelected(option === RightAnalysisPanelOptions.Ensemble);
        setSearchSelected(option === RightAnalysisPanelOptions.Search);
        setSummarySelected(option === RightAnalysisPanelOptions.Summary);
    }

    const handleLeavingOptions = () => {
        setHoverOverEnsemble(false);
        setHoverOverSearch(false);
        setHoverOverSummary(false);
    }
    
    return (
        <div className="right_analysis_panel_container" style={{
            width: isExpanded ? "100%" : "auto", // Auto-width when collapsed
            maxWidth: isExpanded ? "100%" : "fit-content", // Fit the content naturally
            minWidth: "450px", // Set a minimum width for the panel
        }}>
            <div className="check_stuff_leaves" onMouseLeave={handleLeavingOptions}>
                <div className="options_for_right_analysis_panel">
                        <div className="dropdown-button" onMouseEnter={() => handleHoverOverOption(RightAnalysisPanelOptions.Ensemble)}>
                            <button>Ensemble</button>
                        </div>
                        <div className="dropdown-button" onMouseEnter={() => handleHoverOverOption(RightAnalysisPanelOptions.Search)}>
                            <button>Search for District Plan</button>
                        </div>
                        <div className="dropdown-button" onMouseEnter={() => handleHoverOverOption(RightAnalysisPanelOptions.Summary)}>
                            <button>Summary</button>
                        </div>
                </div>
                {
                    ensembleSelected && (
                        (() => {
                            console.log("working in here!", ensembleOptionSelected);
                            if (ensembleOptionSelected === RightAnalysisEnsembleOptions.SMD) {
                                return <EnsembleSummarySMD state={state}/>
                            }
                            else if (ensembleOptionSelected === RightAnalysisEnsembleOptions.MMD) {
                                return <EnsembleSummaryMMD state={state}/>
                            }
                            else {
                                return <EnsembleSummaryCompare state={state}/>
                            }
                        })()
                    )
                }
                {(hoverOverEnsemble || hoverOverSummary || hoverOverSearch) && (
                    <div className="dropdown-menu">
                        {
                            hoverOverEnsemble &&
                            Object.keys(RightAnalysisEnsembleOptions).map((ensembleOption) => {
                                return (
                                    <p key={ensembleOption} onClick={() => {
                                        setEnsembleOptionSelected(ensembleOption);
                                        handleLeavingOptions();
                                        handleSelectOption(RightAnalysisPanelOptions.Ensemble);
                                    }}>{ensembleOption}</p>
                                )
                            })
                        }
                        {
                            hoverOverSearch &&
                            Object.keys(RightAnalysisSearchOptions).map((searchOption) => {
                                return (
                                    <p key={searchOption} onClick={(searchOption) => {
                                        setSearchOptionSelected(searchOption);
                                        handleLeavingOptions();
                                        handleSelectOption(RightAnalysisPanelOptions.Search);
                                    }}>{searchOption}</p>
                                )
                            })
                        }
                        {
                            hoverOverSummary &&
                            Object.keys(RightAnalysisSummaryOptions).map((summaryOption) => {
                                return (
                                    <p key={summaryOption} onClick={(summaryOption) => {
                                        setSummaryOptionSelected(summaryOption);
                                        handleLeavingOptions();
                                        handleSelectOption(RightAnalysisPanelOptions.Summary);
                                    }}>{summaryOption}</p>
                                )
                            })
                        }
                    </div>
                )}
            </div>
            {/* <div className="left_data_panel_current_selection">
                <button className="right_data_expand_button" onClick={togglePanel}>
                    <FontAwesomeIcon icon={isExpanded ? faCompressAlt : faExpandAlt} />
                </button>
            </div> */}
        </div>
    )
}