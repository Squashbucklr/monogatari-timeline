import React from 'react';
import constants from '../resources/constants.json';

import Timeline from './Timeline';
import Settings from './Settings';
import HeadTitle from './HeadTitle';

import './App.scss';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            arcsOrder: [...Array(constants.arcs.length).keys()],
            arcs: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35],
            spoiler: {
                alwaysShowCompletedArcs: true,
                hideSpoilerArcs: true,
                hideAllArcs: false
            },
            peek: [] // list of arcs
        }
    }

    setArcsOrder = (arcsOrder) => {
        if (!arcsOrder) {
            this.setState({arcsOrder: [...Array(constants.arcs.length).keys()]})
        } else {
            this.setState({arcsOrder: arcsOrder});
        }
    }

    setSpoiler = (spoiler) => {
        this.setState({spoiler: spoiler});
    }

    setViewArcs = (arcs) => {
        this.setState({arcs: []});
    }

    onPeek = (index) => {

    }

    render() {
        return (
            <div className="App">
                <HeadTitle/>
                <Timeline
                    arcs={this.state.arcs}
                    peek={this.state.peek}
                    onPeek={this.onPeek}
                />
                <Settings
                    arcsOrder={this.state.arcsOrder}
                    spoiler={this.state.spoiler}
                    setArcsOrder={this.setArcsOrder}
                    setSpoiler={this.setSpoiler}
                    setViewArcs={this.setViewArcs}
                />
            </div>
        );
    }
}

export default App;
