import React from 'react';
import constants from '../resources/constants.json';

import Timeline from './Timeline';
import Settings from './Settings';

import './App.scss';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            arcsOrder: [...Array(constants.arcs.length).keys()],
            spoiler: {
                alwaysShowCompletedArcs: true,
                hideSpoilerArcs: true,
                hideAllArcs: false
            }
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

    render() {
        return (
            <div className="App" style={{height: '100%'}}>
                
            <Settings
                arcsOrder={this.state.arcsOrder}
                spoiler={this.state.spoiler}
                setArcsOrder={this.setArcsOrder}
                setSpoiler={this.setSpoiler}
            />
                
            </div>
        );
    }
}

export default App;
