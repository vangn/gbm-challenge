const React = require('react');
const connect = require('react-redux').connect;

const getGBMData = require('../shared/domain/gbm-domain').actions.getGBMData;

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            username: '',
        };
    }

    componentDidMount() {
        this.props.getGBMData();
    }

    render() {
        const { username } = this.state;
        return (
            <div className="home-background">
                <h1>Loading.. please wait!</h1>
            </div>
        );
    }
}

App.propTypes = {
    resultObj: React.PropTypes.shape({}),
    getGBMData: React.PropTypes.func,
};

const mapStateToProps = state => ({
    resultObj: state.resultObj,
});

const mapDispatchToProps = dispatch => ({
    getGBMData: () => dispatch(getGBMData()),
});

module.exports = connect(mapStateToProps, mapDispatchToProps)(App);
