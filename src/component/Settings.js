import React from 'react';
import constants from '../resources/constants.json';

import './Settings.scss';
import ArcSelector from './ArcSelector';
import Credits from './Credits';
import Modal from './Modal';
import { TimerSharp } from '@material-ui/icons';

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showArcOrderSelector: false,
            showFullArcOrder: false
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

    showArcOrderSelector = () => {
        this.setState({showArcOrderSelector: true});
    }

    getTitle = (arcnum) => {
        let title = "";
        let spoilerArcsFuture = constants.arcs[arcnum].spoiler &&
            this.props.spoiler.spoilerArcsFuture &&
            this.props.arcsOrder.indexOf(arcnum) >= this.props.progress;
        let spoilerArcsSeen = constants.arcs[arcnum].spoiler &&
            this.props.spoiler.spoilerArcsSeen &&
            this.props.arcsOrder.indexOf(arcnum) < this.props.progress
        let arcsFuture = this.props.spoiler.arcsFuture &&
            this.props.arcsOrder.indexOf(arcnum) >= this.props.progress;
        if (spoilerArcsFuture || spoilerArcsSeen || arcsFuture) {
            if (this.props.useLNTitle) {
                let arcnum_in_set = constants.ln[constants.arcs[arcnum].ln].arcs.indexOf(arcnum) + 1;
                title += constants.ln[constants.arcs[arcnum].ln].name + " Arc " + arcnum_in_set;
            } else {
                let arcnum_in_set = constants.anime[constants.arcs[arcnum].anime].arcs.indexOf(arcnum) + 1;
                title += constants.anime[constants.arcs[arcnum].anime].name + " Arc " + arcnum_in_set;
            }
        } else {
            title += constants.arcs[arcnum].name;
        }
        return title;
    }

    toggleFullArcOrder = () => {
        this.setState({showFullArcOrder: !this.state.showFullArcOrder});
    }

    arcsOrderChange = (e) => {
        let ordernum = e.target.value;
        if (ordernum >= 0) {
            this.parseArcOrder(constants.order[ordernum].order);
        } else {
            this.parseArcOrder(this.props.arcsOrder);
        }
    }

    bumpOrder = (isUp, cur_pos) => {
        return () => {
            let newOrder = [...this.props.arcsOrder];
            if (isUp && cur_pos > 0) {
                let tmp = newOrder[cur_pos];
                newOrder[cur_pos] = newOrder[cur_pos - 1];
                newOrder[cur_pos - 1] = tmp;
            } else if (!isUp && cur_pos < this.props.arcsOrder.length - 1) {
                let tmp = newOrder[cur_pos];
                newOrder[cur_pos] = newOrder[cur_pos + 1];
                newOrder[cur_pos + 1] = tmp;
            }
            this.parseArcOrder(newOrder);
        }
    }

    parseArcOrder = (order) => {
        order = [...order];
        let matches = [];
        for (let j = 0; j < constants.order.length; j++) {
            matches.push(true);
        }
        for (let i = 0; i < order.length; i++) {
            for (let j = 0; j < constants.order.length; j++) {
                if (order[i] != constants.order[j].order[i]) matches[j] = false;
            }
        }
        let match = matches.indexOf(true);
        if (match >= 0) {
            this.props.setArcsOrder(constants.order[match].order, match);
        } else {
            this.props.setArcsOrder(order, -1);
        }
    }

    render() {
        let arcOrderPresetsOptions = [];

        for (let i = 0; i < constants.order.length; i++) {
            arcOrderPresetsOptions.push(
                <option value={i}>{constants.order[i].name}</option>
            );
        }
        if (this.props.arcsOrderSource == -1) {
            arcOrderPresetsOptions.push(
                <option value={-1}>Custom</option>
            );
        }

        let arcOrderPresets = (
            <select value={this.props.arcsOrderSource} onChange={this.arcsOrderChange}>
                {arcOrderPresetsOptions}
            </select>
        );

        let fullArcOrderEntries = [];

        for (let i = 0; i < this.props.arcsOrder.length; i++) {
            let title = this.getTitle(this.props.arcsOrder[i]);
            fullArcOrderEntries.push(
                <div className="arcOrderEntry">
                    <div className="move" onClick={this.bumpOrder(true, i)}>ᐱ</div>
                    <div className="move" onClick={this.bumpOrder(false, i)}>ᐯ</div>
                    <div className="name">{title}</div>
                </div>
            );
        }

        let fullArcOrder = this.state.showFullArcOrder ? (
            <div>
                {fullArcOrderEntries}
            </div>
        ) : "";

        let warning = this.props.arcsOrderSource != 0 ? (
            <p class="lred">Warning, you aren't using the preferred light novel order.</p>
        ) : "";

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
                    <span onClick={this.showArcOrderSelector}>{this.props.arcsOrderSource >= 0 ? constants.order[this.props.arcsOrderSource].name : "Custom"}</span>
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
                <Modal title="Arc Order" content={
                    <div>
                        <p>Select from preset:</p>
                        {arcOrderPresets}
                        <p><span className="button" onClick={this.toggleFullArcOrder}>{this.state.showFullArcOrder ? "Hide" : "Show" } full arc order</span></p>
                        {fullArcOrder}
                        <div>
                            {warning}
                            <p class="italic">Why isn't the series in chronological order?</p>
                            <p>The series is presented out of order on purpose. Not knowing certain events creates a sort of mystery element and improves the surprise during reveals. Arcs happening chronologically before later arcs are presented assuming you know what happens later down the line.</p>
                            <p class="italic">If people watched it as it released, isn't the anime release order fine?</p>
                            <p>As the anime was being released, the anime order was the only real viable way of watching the series. Now that all arcs in first season, second season, and final season have been released, watching it in the light novel order is prefered as the series was written that way to form a meta-narrative that isn't clearly conveyed when watched in other orders. Shaft also did a very good job adapting the series so that it works in light novel order. Even though that's not how the anime released, they didn't change the parts that wouldn't make sense having not seen certain parts. This makes the anime order actually more confusing to watch than the light novel order.</p>
                            <p class="italic">Why is Hanamonogatari in the middle of Second Season?</p>
                            <p>That's the way the novels originally came out. Hanamonogatari is part of the "Second Season" of light novels. Even though Hanamonogatari is chronologically the last event to happen in the series, it introduces ideas that are brought up without explanation in later parts of second season. Watching it after the second arc in second season is important to the meta-narrative.</p>
                        </div>
                    </div>
                } show={this.state.showArcOrderSelector} hide={() => {this.setState({showArcOrderSelector: false})}} />
            </div>
        );
    }
}

export default Settings;
