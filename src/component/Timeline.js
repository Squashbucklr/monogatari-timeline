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
        // Collect every arc start or end in sorted order
        let events = [];
        for (let i = 0; i < this.props.arcs.length; i++) {
            events.push({
                date: constants.arcs[this.props.arcs[i]].start,
                on: true,
                araragi: constants.arcs[this.props.arcs[i]].narrator == 0,
                arc: this.props.arcs[i]
            });
            events.push({
                date: constants.arcs[this.props.arcs[i]].end,
                on: false,
                araragi: constants.arcs[this.props.arcs[i]].narrator == 0,
                arc: this.props.arcs[i]
            });
        }
        events.sort(function(a, b) {
            return a.date - b.date;
        });

        // get events on a per-day basis
        let dates = [];
        let cur_date = 0;
        for (let i = 0; i < events.length; i++) {
            if (Math.floor(events[i].date) != cur_date) {
                dates.push({
                    date: Math.floor(events[i].date),
                    events: []
                });
                cur_date = Math.floor(events[i].date);
            }
            dates[dates.length - 1].events.push(events[i]);
        }

        console.log(dates);

        let blocks_date = [];
        let blocks_araragi = [];
        let blocks_other = [];
        
        let cur_araragi = null;
        let cur_other = null;

        let pre_date_height = 0;

        for (let i = 0; i < dates.length; i++) {
            let date_height = 0;
            let cur_subdate = dates[i].events[0].date;
            let ex_araragi_bump = false;
            let ex_other_bump = false;

            let bump = function(e) {
                let exjump = 0;
                if(ex_araragi_bump) {
                    if (e && e.on && e.araragi) {
                        exjump = 1;
                        ex_other_bump = false;
                    }
                    ex_araragi_bump = false;
                }
                if(ex_other_bump) {
                    if (e && e.on && !e.araragi) {
                        exjump = 1;
                    }
                    ex_other_bump = false;
                }
                date_height += 1 //+ exjump;
                if (cur_araragi) cur_araragi.height += 1 + exjump;
                if (cur_other) cur_other.height += 1 + exjump;
                
            }

            for (let j = 0; j < dates[i].events.length; j++) {
                let e = dates[i].events[j];

                if (e.on) {
                    if (e.araragi) {
                        cur_araragi = {
                            arc: e.arc,
                            height: 0,
                            top: pre_date_height + date_height
                        };
                    } else {
                        cur_other = {
                            arc: e.arc,
                            height: 0,
                            top: pre_date_height + date_height
                        };
                    }
                } else {
                    if (date_height == 0 || (cur_araragi && cur_araragi.height == 0) || (cur_other && cur_other.height == 0)) {
                        bump(e);
                    }
                    if (e.araragi) {
                        blocks_araragi.push(cur_araragi);
                        cur_araragi = null;
                        ex_araragi_bump = true;
                    } else {
                        blocks_other.push(cur_other);
                        cur_other = null;
                        ex_other_bump = true;
                    }
                }
            }
            if (date_height == 0 || (cur_araragi && cur_araragi.height == 0) || (cur_other && cur_other.height == 0)) {
                bump();
            }
            blocks_date.push({
                date: dates[i].date,
                top: pre_date_height,
                height: date_height
            });
            pre_date_height += date_height;
        }

        
        return {date: blocks_date, araragi: blocks_araragi, other: blocks_other, height: pre_date_height};
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
                    lineHeight: (20 * blocks.date[i].height) - 6 + 'px'
                }}>{dateToHuman(blocks.date[i].date)}</div>
            );
        }

        for (let i = 0; i < blocks.araragi.length; i++) {
            items_araragi.push(
                <div className="timeline-arc" key={"a" + i} style={{
                    top: (20 * blocks.araragi[i].top),
                    lineHeight: (20 * blocks.araragi[i].height) - 2 + 'px',
                    backgroundColor: constants.characters[constants.arcs[blocks.araragi[i].arc].focus].tint + "44"
                }}>{constants.arcs[blocks.araragi[i].arc].name}</div>
            );
        }

        for (let i = 0; i < blocks.other.length; i++) {
            items_other.push(
                <div className="timeline-arc" key={"o" + i} style={{
                    top: (20 * blocks.other[i].top),
                    lineHeight: (20 * blocks.other[i].height) - 2 + 'px',
                    backgroundColor: constants.characters[constants.arcs[blocks.other[i].arc].focus].tint + "66"
                }}>{constants.arcs[blocks.other[i].arc].name}</div>
            );
        }

        return (
            <div className="Timeline">
                <div className="timeline-inner">
                    <div className="timeline-arcgap" style={{height: 20 * blocks.height}}>
                        {items_other}
                    </div>
                    <div className="timeline-line" style={{height: 20 * blocks.height}}></div>
                    <div className="timeline-dategap" style={{height: 20 * blocks.height}}>
                        {items_date}
                    </div>
                    <div className="timeline-line" style={{height: 20 * blocks.height}}></div>
                    <div className="timeline-arcgap" style={{height: 20 * blocks.height}}>
                        {items_araragi}
                    </div>
                </div>
            </div>
        );
    }
}

export default Timeline;
