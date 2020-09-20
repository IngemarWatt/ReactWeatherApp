import React from "react"

const Wrapper = (props) => {
    return (
        <div className="wrapper">
            <img alt="City Background" className="firstBackground"/>
            <img alt="City Background" className="secondBackground"/>
            { props.children }
        </div>
    )
}

export default Wrapper