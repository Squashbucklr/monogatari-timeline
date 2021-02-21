import React from 'react';
import './Credits.scss';
import Modal from './Modal';

class Credits extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showCredits: false
        };
    }

    showCredits = () => {
        this.setState({showCredits: true});
    }

    render(){
        return (
            <div>
                <div className="Credits">
                    <a onClick={this.showCredits}>Credits</a> | <a href="https://github.com/Squashbucklr/monogatari-timeline">Source Code</a>
                </div>
                <Modal title="Credits" content={
                    <div>
                        <p>Created by Squashbucklr. <a href="https://github.com/Squashbucklr">Github</a> | <a href="https://myanimelist.net/profile/Squashbucklr">MAL</a></p>
                        <p>Thanks to u/maxdefolsch for timeline sources:</p>
                        <ul>
                            <li><a href="https://imgur.com/gallery/iXUyxam">Simplified Chronological Order</a></li>
                            <li><a href="https://www.reddit.com/r/araragi/comments/413akz">Precise Timeline</a></li>
                        </ul>
                        <p><a href="https://www.reddit.com/r/araragi">r/araragi</a></p>
                        <p><a href="https://www.reddit.com/r/araragi/comments/ln5fpl">Hana placement thread</a></p>
                        
                    </div>
                } show={this.state.showCredits} hide={() => {this.setState({showCredits: false})}} />
            </div>
        );
    }
}

export default Credits;
