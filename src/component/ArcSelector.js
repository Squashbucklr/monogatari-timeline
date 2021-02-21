import React from 'react';
import constants from '../resources/constants.json';

import covers from '../resources/covers/covers.js';
import spoilercover from '../resources/covers/spoiler.jpg';

import './ArcSelector.scss';

class ArcSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    setProgress = (progress) => {
        return () => {
            this.props.setProgress(progress);
        }
    }

    render() {

        let has_prev = this.props.progress > 1;
        let prev_cover = "";
        let prev_name = "";
        let prev_arcname = "";
        if(has_prev) {
            let prev_arcnum = this.props.arcsOrder[this.props.progress - 2];
            let prev_arc = constants.arcs[prev_arcnum];
            let prev_spoil = this.props.spoiler.spoilerArcsSeen && prev_arc.spoiler;
            prev_cover = prev_spoil ? <img src={spoilercover}></img> : <img src={covers[prev_arc.image[prev_arc.image.length - 1]]}></img>
            let prev_arcnum_in_set = 0;
            if (this.props.useLNTitle) {
                prev_arcnum_in_set = constants.ln[prev_arc.ln].arcs.indexOf(prev_arcnum) + 1;
                prev_name = constants.ln[prev_arc.ln].name;
            } else {
                prev_arcnum_in_set = constants.anime[prev_arc.anime].arcs.indexOf(prev_arcnum) + 1;
                prev_name = constants.anime[prev_arc.anime].name;
            }
            prev_arcname = prev_spoil ? ("Arc " + prev_arcnum_in_set) : prev_arc.name;
        }

        let has_cur = this.props.progress > 0 && this.props.progress <= this.props.arcsOrder.length;
        let cur_cover = "";
        let cur_name = "";
        let cur_arcname = "";
        if(has_cur) {
            let cur_arcnum = this.props.arcsOrder[this.props.progress - 1];
            let cur_arc = constants.arcs[cur_arcnum];
            let cur_spoil = this.props.spoiler.spoilerArcsSeen && cur_arc.spoiler;
            cur_cover = cur_spoil ? <img src={spoilercover}></img> : <img src={covers[cur_arc.image[cur_arc.image.length - 1]]}></img>
            let cur_arcnum_in_set = 0;
            if (this.props.useLNTitle) {
                cur_arcnum_in_set = constants.ln[cur_arc.ln].arcs.indexOf(cur_arcnum) + 1;
                cur_name = constants.ln[cur_arc.ln].name;
            } else {
                cur_arcnum_in_set = constants.anime[cur_arc.anime].arcs.indexOf(cur_arcnum) + 1;
                cur_name = constants.anime[cur_arc.anime].name;
            }
            cur_arcname = cur_spoil ? ("Arc " + cur_arcnum_in_set) : cur_arc.name;
        }

        let has_next = this.props.progress < this.props.arcsOrder.length;
        let next_cover = "";
        let next_name = "";
        let next_arcname = "";
        if(has_next) {
            let next_arcnum = this.props.arcsOrder[this.props.progress + 0];
            let next_arc = constants.arcs[next_arcnum];
            let next_spoil = this.props.spoiler.arcsFuture || (this.props.spoiler.spoilerArcsFuture && next_arc.spoiler);
            next_cover = next_spoil ? <img src={spoilercover}></img> : <img src={covers[next_arc.image[next_arc.image.length - 1]]}></img>
            let next_arcnum_in_set = 0;
            if (this.props.useLNTitle) {
                next_arcnum_in_set = constants.ln[next_arc.ln].arcs.indexOf(next_arcnum) + 1;
                next_name = constants.ln[next_arc.ln].name;
            } else {
                next_arcnum_in_set = constants.anime[next_arc.anime].arcs.indexOf(next_arcnum) + 1;
                next_name = constants.anime[next_arc.anime].name;
            }
            next_arcname = next_spoil ? ("Arc " + next_arcnum_in_set) : next_arc.name;
        }

        return (
            <div className="ArcSelector">
                <div className="arcselector-arrow left" onClick={this.setProgress(this.props.progress - 1)}></div>
                <div className="arcselector-small">
                    {prev_cover}
                    <div>
                        <span>{prev_name}</span>
                        <span>{prev_arcname}</span>
                    </div>
                </div>
                <div className="arcselector-big">
                    {cur_cover}
                    <div>
                        <span>{cur_name}</span>
                        <span>{cur_arcname}</span>
                    </div>
                </div>
                <div className="arcselector-small">
                    {next_cover}
                    <div>
                        <span>{next_name}</span>
                        <span>{next_arcname}</span>
                    </div>
                </div>
                <div className="arcselector-arrow right" onClick={this.setProgress(this.props.progress + 1)}></div>
            </div>
        );
    }
}

export default ArcSelector;
