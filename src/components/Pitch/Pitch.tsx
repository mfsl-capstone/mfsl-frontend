import React, { Component } from "react";
import pitch from "./img/pitch.png";
import lines from "./img/lines.png";
import "./Pitch.scss";
import classNames from "classnames";
import TeamView, { Team } from "../Team/Team";

interface PitchProps {
    team?: Team;
}

interface PitchState {

}

class Pitch extends Component<PitchProps, PitchState> {
    render() {
        const { team } = this.props;
        return (
            <div
                className={classNames("pitch", "normal")}
                style={{
                    backgroundColor: '#588f58',
                    backgroundImage: `url(${pitch}), url(${lines})`,
                    transform: 'rotate(90deg)',
                }}
            >
                { team && <TeamView team={team} /> }
            </div>
        );
    }
}
export default Pitch;
