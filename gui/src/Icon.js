import React from "react";
import icons from "./Icons";

const Icon = ({ name, color, size, className, borderWidth, borderColor }) => {
    const { path, viewBox } = icons[name];
    const iconSize = size ? size : 1;

    return (
        <svg
            className={className}
            style={{ height: `${iconSize}em`, width: `${iconSize}em`, border: borderWidth ? `${borderWidth}px solid ${borderColor}` : "none",
        }}
            viewBox={viewBox}
        >
            <path d={path} style={{ fill: color ? color : "currentColor" }} />
        </svg>
    );
};

export default Icon;