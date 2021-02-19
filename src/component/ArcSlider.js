import React from 'react';
import constants from '../resources/constants.json';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
    outer: {
        'min-height': 550,
        height: '100vh',
        width: 152,
        display: 'block'
    },
    inner: {
        'margin-left': -20,
        height: 'calc(100% - 42px)',
        'padding': '21px 0px',
        width: 100,
        display: 'block'
    }
});





export default function VerticalSlider(props) {
    const classes = useStyles();

    return (
        <div className={classes.outer}>
            <div className={classes.inner}>
                <Slider
                    orientation={"vertical"}
                    defaultValue={36}
                    track={"inverted"}
                    min={0}
                    max={36}
                    step={1}
                    marks={props.getMarks()}
                    onChange={props.updateArcs}
                />
            </div>
        </div>
    );
}