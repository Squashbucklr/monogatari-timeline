import { ArchiveSharp } from '@material-ui/icons';
import React from 'react';
import constants from '../resources/constants.json';

import './Timeline.scss';

function dateToHuman(date) {
    date = Math.floor(date);
    let year = Math.floor(date / 10000);
    let month = Math.floor((date - (year * 10000)) / 100);
    let day = date - (year * 10000) - (month * 100);

    let ret = "";
    switch (month) {
        case 1:
            ret += "Jan ";
            break;
        case 2:
            ret += "Feb ";
            break;
        case 3:
            ret += "Mar ";
            break;
        case 4:
            ret += "Apr ";
            break;
        case 5:
            ret += "May ";
            break;
        case 6:
            ret += "Jun ";
            break;
        case 7:
            ret += "Jul ";
            break;
        case 8:
            ret += "Aug ";
            break;
        case 9:
            ret += "Sep ";
            break;
        case 10:
            ret += "Oct ";
            break;
        case 11:
            ret += "Nov ";
            break;
        case 12:
            ret += "Dec ";
            break;
    }
    ret += day;
    return ret;
}

class Timeline extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            totalHeight: 100
        };
    }

    getBlocks() {
        let tosort = [];

        for (let i = 0; i < this.props.arcs.length; i++) {
            tosort.push({
                date: constants.arcs[this.props.arcs[i]].start,
                on: true,
                araragi: constants.arcs[this.props.arcs[i]].narrator == 0,
                arc: this.props.arcs[i]
            });
            tosort.push({
                date: constants.arcs[this.props.arcs[i]].end,
                on: false,
                araragi: constants.arcs[this.props.arcs[i]].narrator == 0,
                arc: this.props.arcs[i]
            });
        }

        tosort.sort(function(a, b) {
            return a.date - b.date;
        });

        console.log(tosort);

        let blocks_date = [];
        let blocks_araragi = [];
        let blocks_other = [];

        let block_date = {
            height: 0,
            top: 0,
            name: tosort[0].date
        };
        let block_araragi = null;
        let block_other = null;

        let cur_date = tosort[0].date;
        let cur_top = 0;

        for (let i = 0; i < tosort.length; i++) {
            let c = tosort[i];

            if (Math.floor(c.date) == cur_date) {
                block_date.height++;
            } else {
                cur_date = Math.floor(c.date);
                blocks_date.push(block_date);
                block_date = {
                    height: 1,
                    top: cur_top,
                    name: c.date
                }
            }

            if(block_araragi) block_araragi.height++;
            if(block_other) block_other.height++;

            if (c.araragi) {
                if (c.on) {
                    block_araragi = {
                        arc: c.arc,
                        height: 1,
                        top: cur_top
                    };
                } else {
                    blocks_araragi.push(block_araragi);
                    block_araragi = null;
                }
            } else {
                if (c.on) {
                    block_other = {
                        arc: c.arc,
                        height: 1,
                        top: cur_top
                    };
                } else {
                    blocks_other.push(block_other);
                    block_other = null;
                }
            }
            cur_top++;
        }
        return {date: blocks_date, araragi: blocks_araragi, other: blocks_other};
    }

    render() {
        let blocks = this.getBlocks();
        console.log(blocks);

        let items_date = [];
        let items_araragi = [];
        let items_other = [];

        for (let i = 0; i < blocks.date.length; i++) {
            items_date.push(
                <div className="timeline-date" key={"d" + i} style={{
                    top: (20 * blocks.date[i].top),
                    'line-height': (20 * blocks.date[i].height)
                }}>{dateToHuman(blocks.date[i].name)}</div>
            );
        }

        for (let i = 0; i < blocks.araragi.length; i++) {
            items_araragi.push(
                <div className="timeline-arc" key={"a" + i} style={{
                    top: (20 * blocks.araragi[i].top),
                    'line-height': (20 * blocks.araragi[i].height) - 2
                }}>{constants.arcs[blocks.araragi[i].arc].name}</div>
            );
        }

        for (let i = 0; i < blocks.other.length; i++) {
            items_other.push(
                <div className="timeline-arc" key={"o" + i} style={{
                    top: (20 * blocks.other[i].top),
                    'line-height': (20 * blocks.other[i].height) - 2
                }}>{constants.arcs[blocks.other[i].arc].name}</div>
            );
        }

        return (
            <div className="Timeline">
                <div className="timeline-inner">
                    <div className="timeline-arcgap" style={{height: this.state.totalHeight}}>
                        {items_other}
                    </div>
                    <div className="timeline-line"></div>
                    <div className="timeline-dategap" style={{height: this.state.totalHeight}}>
                        {items_date}
                    </div>
                    <div className="timeline-line"></div>
                    <div className="timeline-arcgap" style={{height: this.state.totalHeight}}>
                        {items_araragi}
                    </div>
                </div>
            </div>
        );
    }
}

export default Timeline;
