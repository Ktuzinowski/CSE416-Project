import "../../App.css"

export const RightAnalysisDropdown = ({options, callbackForValueChange}) => {
    return (
        <select className="dropdown_for_right_analysis_panel" onChange={(e) => callbackForValueChange(e.target.value)}>
            {Object.keys(options).map((optionName) => {
                return (
                    <option key={options[optionName]} value={options[optionName]}>
                        {optionName}
                    </option>
                )
            })}
        </select>
    )
}