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

    onArcClick = (index) => {
        this.props.setViewArcs(this.props.arcsOrder.slice(0, index));
    }

    handleChange = (e) => {
        this.onArcClick(e.target.value);
    }

    toggleSpoiler = (spoiler) => {
        return () => {
            let updateSpoilerVal = this.props.spoiler;
            updateSpoilerVal[spoiler] = !this.props.spoiler[spoiler];
            this.props.setSpoiler(updateSpoilerVal);
        }
    }

    setUseLNTitle = (ln) => {
        return () => {
            this.props.setUseLNTitle(ln);
        }
    }

    render() {
        return (
            <div className="Settings">
                <div className="settings-label">
                    Hide arcs that are
                </div>
                <div className="settings-opts">
                    <div className={this.props.spoiler.spoilerArcsSeen ? "settings-toggle-active" : "settings-toggle"} onClick={this.toggleSpoiler("spoilerArcsSeen")}>
                        Seen Spoiler Arcs
                    </div>
                    <div className={this.props.spoiler.spoilerArcsFuture ? "settings-toggle-active" : "settings-toggle"} onClick={this.toggleSpoiler("spoilerArcsFuture")}>
                        Future Spoiler Arcs
                    </div>
                    <div className={this.props.spoiler.arcsFuture ? "settings-toggle-active" : "settings-toggle"} onClick={this.toggleSpoiler("arcsFuture")}>
                        Future Arcs
                    </div>
                </div>
                <div className="settings-label">
                    Prefer
                </div>
                <div className="settings-opts">
                    <div className={this.props.useLNTitle ? "settings-toggle" : "settings-toggle-active"} onClick={this.setUseLNTitle(false)}>
                        Anime Season Titles
                    </div>
                    <div className={this.props.useLNTitle ? "settings-toggle-active" : "settings-toggle"} onClick={this.setUseLNTitle(true)}>
                        LN Titles
                    </div>
                </div>
                <input onChange={this.handleChange}/>
            </div>
        );
    }
}

export default Settings;
