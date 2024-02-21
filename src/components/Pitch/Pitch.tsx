import React, { Component } from "react";
import pitch from "./img/pitch.png";
import lines from "./img/lines.png";
import "./Pitch.scss";
import classNames from "classnames";

class Pitch extends Component {
    render() {
        return (
            <div
                className={classNames("pitch", "normal")}
                style={{
                    backgroundColor: '#588f58',
                    backgroundImage: `url(${pitch}), url(${lines})`
                }}
            >
                Team
            </div>
        );
    }
}
export default Pitch;
