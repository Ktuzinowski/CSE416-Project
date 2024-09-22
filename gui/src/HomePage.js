import { Link } from "react-router-dom"
export const HomePage = () => {
    return (
        <>
            <h1 className="state_heading">Select State</h1>
            <Link to="/arizona" className="state_selection">
                Arizona
            </Link>
            <Link to="/texas" className="state_selection">
                Texas
            </Link>
            <Link to="/utah" className="state_selection">
                Utah
            </Link>
            <div>
                <div className="background"></div>
                <div className="overlay"></div>
                <div className="content">
                    <h3>Background</h3>
                    <p>
                    This project was made to understand the limitations and pitfalls of current district plans. Learning how minorities are disenfranchized, and how we can change that for the better. This project proposes the use of the Fair Representation Act (FRA) to find a better means of helping others in districts with voting. This GUI will help you explore the fairness of the current district plan versus the one proposed by the FRA. Help us support the FRA by educating yourself on this topic! 
                    </p>
                    <p>
                    Want to learn more? Check out our <a className="no_style_link" href="/education">Education</a> tab for more resources on how districting currently works in the U.S. and the ways people are trying to make it better.
                    </p>
                </div>
            </div>
        </>
    )
}