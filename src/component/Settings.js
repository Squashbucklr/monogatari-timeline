import React from 'react';
import constants from '../resources/constants.json';

import Slider from '@material-ui/core/Button';

import './Settings.scss';
import ArcSlider from './ArcSlider';

const getArc = (value) => {
    return constants.arcs[value].name;
}

const getMarks = () => {
    let marks = [];
    for (let i = 0; i < constants.arcs.length; i++) {
        marks.push({
            value: i,
            label: constants.arcs[i].name
        });
    }
    return marks;
}

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            beforeArcIndex: 0
        };
    }

    updateSpoiler = () => {
        this.props.setSpoiler({hideAllArcs: !this.props.spoiler.hideAllArcs})
    }

    updateArcs = (event, value) => {
        this.setState({beforeArcIndex: 36 - value});
    }

    getMarks = () => {
        let marks = [];
        for (let i = 0; i < this.props.arcsOrder.length; i++) {
            let index = constants.arcs.length - 1 - i;
            let show = true;
            if (index >= this.state.beforeArcIndex) {
                if (this.props.spoiler.hideAllArcs) {
                    show = false;
                } else if (this.props.spoiler.hideSpoilerArcs && constants.arcs[this.props.arcsOrder[index]].spoiler) {
                    show = false;
                } else {
                    show = true;
                }
            } else {
                if (this.props.spoiler.alwaysShowCompletedArcs) {
                    show = true;
                }
            }
            marks.push({
                value: i,
                label: show ? constants.arcs[this.props.arcsOrder[index]].name : "#### ####"
            });
        }
        return marks;
    }

    render() {
        return (
            <div>
                {this.state.beforeArcIndex}
                <ArcSlider updateArcs={this.updateArcs} getMarks={this.getMarks} />
            </div>
        );
    }
}

export default Settings;
