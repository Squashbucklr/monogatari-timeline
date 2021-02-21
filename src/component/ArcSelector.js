import React from 'react';
import constants from '../resources/constants.json';

import covers from '../resources/covers/covers.js';

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
            let prev_arc = constants.arcs[this.props.progress - 2];
            prev_cover = <img src={covers[prev_arc.image[prev_arc.image.length - 1]]}></img>
            if (this.props.useLNTitle) {
                prev_name = constants.ln[prev_arc.ln].name;
            } else {
                prev_name = constants.anime[prev_arc.anime].name;
            }
            prev_arcname = prev_arc.name;
        }

        let has_cur = this.props.progress > 0 && this.props.progress <= this.props.arcsOrder.length;
        let cur_cover = "";
        let cur_name = "";
        let cur_arcname = "";
        if(has_cur) {
            let cur_arc = constants.arcs[this.props.progress - 1];
            cur_cover = <img src={covers[cur_arc.image[cur_arc.image.length - 1]]}></img>
            if (this.props.useLNTitle) {
                cur_name = constants.ln[cur_arc.ln].name;
            } else {
                cur_name = constants.anime[cur_arc.anime].name;
            }
            cur_arcname = cur_arc.name;
        }

        let has_next = this.props.progress < this.props.arcsOrder.length;
        let next_cover = "";
        let next_name = "";
        let next_arcname = "";
        if(has_next) {
            let next_arc = constants.arcs[this.props.progress + 0];
            next_cover = <img src={covers[next_arc.image[next_arc.image.length - 1]]}></img>
            if (this.props.useLNTitle) {
                next_name = constants.ln[next_arc.ln].name;
            } else {
                next_name = constants.anime[next_arc.anime].name;
            }
            next_arcname = next_arc.name;
        }

        return (
            <div className="ArcSelector">
                <div className="arcselector-arrow left" onClick={this.setProgress(this.props.progress - 1)}></div>
                <div className="arcselector-small">
                    {prev_cover}
                    <span>{prev_name}</span>
                    <span>{prev_arcname}</span>
                </div>
                <div className="arcselector-big">
                    {cur_cover}
                    <span>{cur_name}</span>
                    <span>{cur_arcname}</span>
                </div>
                <div className="arcselector-small">
                    {next_cover}
                    <span>{next_name}</span>
                    <span>{next_arcname}</span>
                </div>
                <div className="arcselector-arrow right" onClick={this.setProgress(this.props.progress + 1)}></div>
            </div>
        );
    }
}

export default ArcSelector;
