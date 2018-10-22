import React, { Component } from 'react';
import './app.css';

class App extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
        };
    }

    componentDidMount() {
        fetch('/api/getUsername')
            .then(res => res.json())
            .then(user => this.setState({ username: user.username }));
    }

    render() {
        const { username } = this.state;
        return (
            <div className="home-background">
                {username ? <h1>{`Hello ${username}`}</h1> : <h1>Loading.. please wait!</h1>}
            </div>
        );
    }
}

export default App;
