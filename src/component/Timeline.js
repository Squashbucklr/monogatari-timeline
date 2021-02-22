import { ArchiveSharp, FormatAlignRight } from '@material-ui/icons';
import { configure } from '@testing-library/react';
import React from 'react';
import constants from '../resources/constants.json';

import './Timeline.scss';

function dateConvert(date) {
    date = Math.floor(date);
    let year = Math.floor(date / 10000);
    let month = Math.floor((date - (year * 10000)) / 100);
    let day = date - (year * 10000) - (month * 100);

    let human = "";
    let epoch = -84 + (356 * (year - 1)) + day;

    switch (month) {
        case 1:
            human += "Jan ";
            epoch += 0;
            break;
        case 2:
            human += "Feb ";
            epoch += 31;
            break;
        case 3:
            human += "Mar ";
            epoch += 28;
            break;
        case 4:
            human += "Apr ";
            epoch += 31;
            break;
        case 5:
            human += "May ";
            epoch += 30;
            break;
        case 6:
            human += "Jun ";
            epoch += 31;
            break;
        case 7:
            human += "Jul ";
            epoch += 30;
            break;
        case 8:
            human += "Aug ";
            epoch += 31;
            break;
        case 9:
            human += "Sep ";
            epoch += 31;
            break;
        case 10:
            human += "Oct ";
            epoch += 30;
            break;
        case 11:
            human += "Nov ";
            epoch += 31;
            break;
        case 12:
            human += "Dec ";
            epoch += 30;
            break;
    }
    human += day;
    return {human, epoch};
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
        for (let i = 0; i < this.props.progress; i++) {
            events.push({
                date: constants.arcs[this.props.arcsOrder[i]].start,
                on: true,
                araragi: constants.arcs[this.props.arcsOrder[i]].narrator == 0,
                arc: this.props.arcsOrder[i]
            });
            events.push({
                date: constants.arcs[this.props.arcsOrder[i]].end,
                on: false,
                araragi: constants.arcs[this.props.arcsOrder[i]].narrator == 0,
                arc: this.props.arcsOrder[i]
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
                            top: pre_date_height + date_height,
                            hide: (this.props.spoiler.spoilerArcsSeen && constants.arcs[e.arc].spoiler)
                        };
                    } else {
                        cur_other = {
                            arc: e.arc,
                            height: 0,
                            top: pre_date_height + date_height,
                            hide: (this.props.spoiler.spoilerArcsSeen && constants.arcs[e.arc].spoiler)
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

        let items_date = [];
        let items_araragi = [];
        let items_other = [];

        for (let i = 0; i < blocks.date.length; i++) {
            items_date.push(
                <div className="timeline-date" key={"d" + i} style={{
                    top: (15 * blocks.date[i].top),
                    lineHeight: (15 * blocks.date[i].height) - 6 + 'px',
                    height: (15 * blocks.date[i].height) - 6 + 'px'
                }}>{dateConvert(blocks.date[i].date).human}</div>
            );
        }

        for (let i = 0; i < blocks.araragi.length; i++) {
            let hideName = "";
            if (this.props.useLNTitle) {
                let entry = constants.ln[constants.arcs[blocks.araragi[i].arc].ln];
                hideName = entry.sname + " Arc " + (entry.arcs.indexOf(blocks.araragi[i].arc) + 1);
            } else {
                let entry = constants.anime[constants.arcs[blocks.araragi[i].arc].anime];
                hideName = entry.sname + " Arc " + (entry.arcs.indexOf(blocks.araragi[i].arc) + 1);
            }
            let isLatest = (this.props.progress - 1) == this.props.arcsOrder.indexOf(blocks.araragi[i].arc);
            items_araragi.push(
                <div className="timeline-arc" key={"a" + i} style={{
                    top: (15 * blocks.araragi[i].top),
                    lineHeight: (15 * blocks.araragi[i].height) - 2 + 'px',
                    height: (15 * blocks.araragi[i].height) - 2 + 'px',
                    backgroundColor: blocks.araragi[i].hide ? "#443333" : constants.characters[constants.arcs[blocks.araragi[i].arc].focus].tint + "44",
                    borderRight: isLatest ? "2px solid #FF0000" : ""
                }}>{blocks.araragi[i].hide ? hideName : constants.arcs[blocks.araragi[i].arc].name}</div>
            );
        }

        for (let i = 0; i < blocks.other.length; i++) {
            let hideName = "";
            if (this.props.useLNTitle) {
                let entry = constants.ln[constants.arcs[blocks.other[i].arc].ln];
                hideName = entry.sname + " Arc " + (entry.arcs.indexOf(blocks.other[i].arc) + 1);
            } else {
                let entry = constants.anime[constants.arcs[blocks.other[i].arc].anime];
                hideName = entry.sname + " Arc " + (entry.arcs.indexOf(blocks.other[i].arc) + 1);
            }
            let isLatest = (this.props.progress - 1) == this.props.arcsOrder.indexOf(blocks.other[i].arc);
            items_other.push(
                <div className="timeline-arc" key={"o" + i} style={{
                    top: (15 * blocks.other[i].top),
                    lineHeight: (15 * blocks.other[i].height) - 2 + 'px',
                    height: (15 * blocks.other[i].height) - 2 + 'px',
                    backgroundColor: blocks.other[i].hide ? "#443333" : constants.characters[constants.arcs[blocks.other[i].arc].focus].tint + "66",
                    borderLeft: isLatest ? "2px solid #FF0000" : "",
                    textAlign: 'right'
                }}>{blocks.other[i].hide ? hideName : constants.arcs[blocks.other[i].arc].name}</div>
            );
        }

        let araragi = [];
        let other = [];

        if (blocks.araragi.length) {
            araragi.push(
                <div className="timeline-line" style={{height: 15 * blocks.height}}></div>
            );
            araragi.push(
                <div className="timeline-arcgap" style={{height: 15 * blocks.height}}>
                    {items_araragi}
                </div>
            );
        }

        if (blocks.other.length) {
            other.push(
                <div className="timeline-arcgap" style={{height: 15 * blocks.height}}>
                    {items_other}
                </div>
            );
            other.push(
                <div className="timeline-line" style={{height: 15 * blocks.height}}></div>
            );
        }

        return (
            <div className="Timeline">
                <div className="timeline-inner">
                    {other}
                    <div className="timeline-dategap" style={{height: 15 * blocks.height}}>
                        {items_date}
                    </div>
                    {araragi}
                </div>
            </div>
        );
    }
}

export default Timeline;
