import "./RightAnalysisPanel.css"
import "../App.css"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpandAlt, faCompressAlt } from '@fortawesome/free-solid-svg-icons';
import { RightAnalysisPanelOptions, RightAnalysisEnsembleOptions, RightAnalysisSearchOptions, RightAnalysisSummaryOptions } from "../utils/Constants";
import { Ensemble } from "./components/ensemble/Ensemble";
import { SearchSMD } from "./components/search/SearchSMD";
import { SearchMMD } from "./components/search/SearchMMD";
import { SummarySMD } from "./components/ensemble/SummarySMD";
import { SummaryMMD } from "./components/ensemble/SummaryMMD";
import { SmdDistrictPlanSummary } from "./components/summary/SmdDistrictPlanSummary";
import { MmdDistrictPlanSummary } from "./components/summary/MmdDistrictPlanSummary";
import { CurrentDistrictPlanSummary } from "./components/summary/CurrentDistrictPlanSummary";

export const RightAnalysisPanel = ({ currentSmdDistrict, setCurrentSmdDistrict, state, setIsRightAnalysisPanelExpanded }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [hoverOverEnsemble, setHoverOverEnsemble] = useState(false);
    const [hoverOverSearch, setHoverOverSearch] = useState(false);
    const [hoverOverSummary, setHoverOverSummary] = useState(false);
    // State variables to keep track of the screen that is being selected
    const [ensembleSelected, setEnsembleSelected] = useState(true);
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

    const handleNewSmdDistrictSelection = () => {
        setEnsembleSelected(false);
        setSearchSelected(false);
        setSummarySelected(true);
        setSummaryOptionSelected(RightAnalysisSummaryOptions.SMD);
    }
    
    return (
        <div className="right_analysis_panel_container" style={{
            width: isExpanded ? "100%" : "auto", // Auto-width when collapsed
            maxWidth: isExpanded ? "100%" : "fit-content", // Fit the content naturally
            minWidth: "550px", // Set a minimum width for the panel
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
                {(hoverOverEnsemble || hoverOverSummary || hoverOverSearch) && (
                    <div className="dropdown-menu">
                        {
                            (hoverOverEnsemble &&
                                (
                                    <div>
                                        <h3 style={{marginTop: "5px"}}>Ensemble</h3>
                                        {Object.keys(RightAnalysisEnsembleOptions).map((ensembleOption) => {
                                            return (
                                                <p key={ensembleOption} onClick={() => {
                                                    setEnsembleOptionSelected(ensembleOption);
                                                    handleLeavingOptions();
                                                    handleSelectOption(RightAnalysisPanelOptions.Ensemble);
                                                }}>{ensembleOption}</p>
                                            )
                                        })}
                                    </div>
                                )
                            )
                        }
                        {
                            (hoverOverSearch &&
                                (
                                    <div>
                                        <h3 style={{marginTop: "5px"}}>Search</h3>
                                        {Object.keys(RightAnalysisSearchOptions).map((searchOption) => {
                                            return (
                                                <p key={searchOption}
                                                onClick={() => {
                                                    setSearchOptionSelected(searchOption);
                                                    handleLeavingOptions();
                                                    handleSelectOption(RightAnalysisPanelOptions.Search);
                                                }}>{searchOption}</p>
                                            )
                                        })}
                                    </div>
                                )
                            )
                        }
                        {
                            hoverOverSummary &&
                            (
                                <div>
                                    <h3 style={{marginTop: "5px"}}>Summary</h3>
                                    {Object.keys(RightAnalysisSummaryOptions).map((summaryOption) => {
                                        return (
                                            <p key={summaryOption} onClick={() => {
                                                setSummaryOptionSelected(summaryOption);
                                                handleLeavingOptions();
                                                handleSelectOption(RightAnalysisPanelOptions.Summary);
                                            }}>{summaryOption}</p>
                                        )
                                    })}
                                </div>
                            )
                        }
                    </div>
                )}
            </div>
            <div style={{width: "100%", height: "100%"}}>
                {
                        ensembleSelected && (
                            (
                                <Ensemble state={state} />
                            )
                        )
                }
                {
                    searchSelected && (
                        searchOptionSelected === RightAnalysisSearchOptions.SMD ? (
                            <SearchSMD state={state} onMouseEnter={handleLeavingOptions} setCurrentSmdDistrict={setCurrentSmdDistrict} handleNewSmdDistrictSelection={handleNewSmdDistrictSelection} />
                        ) : (
                            <SearchMMD state={state} onMouseEnter={handleLeavingOptions} />
                        )
                    )
                }
                {
                    summarySelected && (
                        summaryOptionSelected === RightAnalysisSummaryOptions.SMD ? (
                            <SmdDistrictPlanSummary name={currentSmdDistrict} onMouseEnter={handleLeavingOptions} />
                        ) : 
                        summaryOptionSelected === RightAnalysisSummaryOptions.Current ?
                        (
                            <CurrentDistrictPlanSummary state={state} />
                        ) :
                        (
                            <MmdDistrictPlanSummary name={currentSmdDistrict} onMouseEnter={handleLeavingOptions} />
                        )
                    )
                }
            </div>
        </div>
    )
}