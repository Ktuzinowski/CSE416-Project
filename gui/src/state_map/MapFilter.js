import React, { useState } from "react";
import "../App.css"

export const MapFilter = ({ showCurrent, setShowCurrent, showSMD, setShowSMD, showMMD, setShowMMD, showPrecincts, setShowPrecincts }) => {
    return (
        <div className="map_filter">
            <span>
                <button
                    style={{borderRight: "None", borderRadius: "3px 0px 0px 3px"}}
                    className={`map_filter_option ${showCurrent ? "selected" : ""}`}
                    onClick={() => setShowCurrent((prevShowCurrent) => {
                        return !prevShowCurrent;
                    })}
                >
                    Current
                </button>
            </span>
            <span>
                <button
                    style={{borderRight: "None"}}
                    className={`map_filter_option ${showSMD ? "selected" : ""}`}
                    onClick={() => setShowSMD((prevShowSMD) => {
                        return !prevShowSMD;
                    })}
                >
                    SMD
                </button>
            </span>
            <span>
                <button
                    className={`map_filter_option ${showMMD ? "selected" : ""}`}
                    onClick={() => setShowMMD((prevShowMMD) => {
                        return !prevShowMMD;
                    })}
                >
                    MMD
                </button>
            </span>
            <span>
                <button
                    style={{borderLeft: "None", borderRadius: "0px 3px 3px 0px"}}
                    className={`map_filter_option ${showPrecincts ? "selected" : ""}`}
                    onClick={() => setShowPrecincts((prevShowPrecincts) => {
                        return !prevShowPrecincts;
                    })}
                >
                    Precincts
                </button>
            </span>
        </div>
    );
};