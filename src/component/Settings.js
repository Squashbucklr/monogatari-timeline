import React from 'react';
import constants from '../resources/constants.json';

import Slider from '@material-ui/core/Button';

import './Settings.scss';
import ArcSlider from './ArcSlider';

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    updateSpoiler = () => {
        this.props.setSpoiler({hideAllArcs: !this.props.spoiler.hideAllArcs})
    }

    onArcClick = (index) => {
        this.props.setViewArcs(this.props.arcsOrder.slice(0, index));
    }

    handleChange = (e) => {
        this.onArcClick(e.target.value);
    }

    render() {
        return (
            <div
                className="Settings"
            >
                <input onChange={this.handleChange}/>
            </div>
        );
    }
}

export default Settings;
