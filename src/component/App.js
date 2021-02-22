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
            arcsOrderSource: 0,
            arcsOrder: constants.order[0].order,
            progress: 0,
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

    setArcsOrder = (arcsOrder, arcsOrderSource) => {
        console.log(arcsOrder, arcsOrderSource)
        this.setState({
            progress: 0,
            arcsOrder,
            arcsOrderSource
        });
    }

    setSpoiler = (spoiler) => {
        this.setState({spoiler: spoiler});
    }

    setProgress = (progress) => {
        if (progress < 0) progress = 0;
        if (progress > this.state.arcsOrder.length) progress = this.state.arcsOrder.length;
        this.setState({progress: progress});
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
                        arcsOrderSource={this.state.arcsOrderSource}
                        spoiler={this.state.spoiler}
                        useLNTitle={this.state.useLNTitle}
                        progress={this.state.progress}
                        setUseLNTitle={this.setUseLNTitle}
                        setArcsOrder={this.setArcsOrder}
                        setSpoiler={this.setSpoiler}
                        setProgress={this.setProgress}
                    />
                </div>
                <Timeline
                    progress={this.state.progress}
                    arcsOrder={this.state.arcsOrder}
                    spoiler={this.state.spoiler}
                    useLNTitle={this.state.useLNTitle}
                />
            </div>
        );
    }
}

export default App;
