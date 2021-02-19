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
        
    }

    render() {
        return (
            <div
                className="Settings"
            >
                
            </div>
        );
    }
}

export default Settings;
