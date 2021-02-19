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
            arcs: [],
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
        this.setState({arcs: arcs});
    }

    onPeek = (index) => {

    }

    render() {
        return (
            <div className="App">
                <HeadTitle/>
                <Settings
                    arcsOrder={this.state.arcsOrder}
                    spoiler={this.state.spoiler}
                    setArcsOrder={this.setArcsOrder}
                    setSpoiler={this.setSpoiler}
                    setViewArcs={this.setViewArcs}
                />
                <Timeline
                    arcs={this.state.arcs}
                    peek={this.state.peek}
                    onPeek={this.onPeek}
                />
            </div>
        );
    }
}

export default App;
