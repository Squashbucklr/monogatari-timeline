import React from 'react';

import './Timeline.scss';

class Timeline extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    handleClick = () => {
        this.props.setSpoiler({hideAllArcs: !this.props.spoiler.hideAllArcs})
    }

    render() {
        return (
            <div
                className="Timeline"
                onClick={this.handleClick}
            >
                {this.props.spoiler.hideAllArcs ? "hello" : "goodbye"}
            </div>
        );
    }
}

export default Timeline;
