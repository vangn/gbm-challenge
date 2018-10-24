const React = require('react');
const connect = require('react-redux').connect;
const { LineChart } = require('react-easy-chart');

const getGBMData = require('../shared/domain/gbm-domain').actions.getGBMData;

class GBMGraph extends React.Component {
    constructor() {
        super();
        const initialWidth = 500;
        this.state = {
            username: 'Hello there!',
            windowWidth: initialWidth - 100,
            componentWidth: 300,
        };
    }

    componentDidMount() {
        console.log(':::::::: componentDidMount');
        this.props.getGBMData();
    }

    render() {
        const { username } = this.state;
        return (
            <div className="">
                <h1>{username}</h1>
                <LineChart
                    data={this.props.resultObj}
                    datePattern={'%d-%b-%y %H:%M'}
                    xType={'time'}
                    width={this.state.componentWidth}
                    height={this.state.componentWidth / 2}
                    axisLabels={{ x: 'Time', y: 'Price ($)' }}
                    interpolate={'cardinal'}
                    yDomainRange={[0, 5000]}
                    axes
                    grid
                    style={{
                        '.line0': {
                            stroke: 'green',
                        },
                    }}
                />
            </div>
        );
    }
}

GBMGraph.propTypes = {
    resultObj: React.PropTypes.shape({}),
    getGBMData: React.PropTypes.func,
};

const mapStateToProps = state => ({
    resultObj: state.resultObj,
});

const mapDispatchToProps = dispatch => ({
    getGBMData: () => dispatch(getGBMData()),
});

module.exports = connect(mapStateToProps, mapDispatchToProps)(GBMGraph);
