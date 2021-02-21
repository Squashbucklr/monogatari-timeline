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
            windowWidth: 1080,
            windowHeight: 937,
            arcsOrder: [...Array(constants.arcs.length).keys()],
            arcs: [],
            spoiler: {
                spoilerArcsFuture: true,
                spoilerArcsSeen: true,
                arcsFuture: true
            },
            useLNTitle: false
        }
    }

    componentDidMount = () => {
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions);
      }
    
      componentWillUnmount = () => {
        window.removeEventListener("resize", this.updateDimensions);
      }
    
      updateDimensions = () => {
        let windowWidth = typeof window !== "undefined" ? window.innerWidth : 0;
        let windowHeight = typeof window !== "undefined" ? window.innerHeight : 0;
    
        this.setState({ windowWidth, windowHeight });
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

    setUseLNTitle = (useLNTitle) => {
        this.setState({useLNTitle: useLNTitle});
    }

    render() {
        return (
            <div className="App">
                <div className="app-left">
                    <HeadTitle/>
                    <Settings
                        arcsOrder={this.state.arcsOrder}
                        spoiler={this.state.spoiler}
                        useLNTitle={this.state.useLNTitle}
                        setUseLNTitle={this.setUseLNTitle}
                        setArcsOrder={this.setArcsOrder}
                        setSpoiler={this.setSpoiler}
                        setViewArcs={this.setViewArcs}
                    />
                </div>
                <Timeline
                    arcs={this.state.arcs}
                    spoiler={this.state.spoiler}
                    useLNTitle={this.state.useLNTitle}
                />
            </div>
        );
    }
}

export default App;
