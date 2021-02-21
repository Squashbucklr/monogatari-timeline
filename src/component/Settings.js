import React from 'react';
import constants from '../resources/constants.json';

import './Settings.scss';
import ArcSelector from './ArcSelector';
import Credits from './Credits';

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
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
                <div className="settings-label">
                    Arc Order
                </div>
                <div className="settings-value">
                    <span>{this.props.arcsOrderName}</span>
                </div>
                <div className="settings-label">
                    Select Viewed Arcs
                </div>
                <ArcSelector
                    arcsOrder={this.props.arcsOrder}
                    progress={this.props.progress}
                    arcs={this.props.arcs}
                    spoiler={this.props.spoiler}
                    useLNTitle={this.props.useLNTitle}
                    setProgress={this.props.setProgress}
                />
                <Credits/>
            </div>
        );
    }
}

export default Settings;
