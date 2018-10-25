const React = require('react');
const connect = require('react-redux').connect;
const { TimeSeries } = require('pondjs');
const {
    Charts,
    ChartContainer,
    ChartRow,
    YAxis,
    LineChart,
} = require('react-timeseries-charts');

const Header = require('./Header');

const getGBMData = require('../../shared/domain/gbm-domain').actions.getGBMData;

class GBMGraph extends React.Component {
    constructor() {
        super();
        this.state = {
            title: 'IPC indicator (Índice de Precios y Cotizaciones)',
            labelPrice: 'Price ($)',
            width: 800,
            height: 182,
            author: 'Author: Carlos Iván García Nieto',
        };
    }

    componentDidMount() {
        this.props.getGBMData();
        this.updateGraphDimensions();
        window.addEventListener('resize', this.updateGraphDimensions.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateGraphDimensions.bind(this));
    }

    updateGraphDimensions() {
        if (window.innerWidth < 500) {
            this.setState({ width: 450, height: 102 });
        } else {
            const updateWidth = window.innerWidth - 100;
            const updateHeight = Math.round(updateWidth / 4.4);
            this.setState({ width: updateWidth, height: updateHeight });
        }
    }

    render() {
        const {
            title,
            labelPrice,
            width,
            height,
            author } = this.state;
        const { resultObj } = this.props;
        const authorLabel = ((resultObj.length > 0) ? author : '');

        const chartStyle = {
            background: '#201d1e',
            borderRadius: 8,
            borderStyle: 'solid',
            borderWidth: 1,
            borderColor: '#232122',
        };

        const axisStyle = {
            label: {
                stroke: 'none',
                fill: '#AAA',
                fontWeight: 500,
                fontSize: 20,
            },
            values: {
                stroke: 'none',
                fill: '#888',
                fontWeight: 100,
                fontSize: 11,
            },
            ticks: {
                fill: 'none',
                stroke: '#AAA',
                opacity: 0.2,
            },
            axis: {
                fill: 'none',
                stroke: '#AAA',
                opacity: 1,
            },
        };

        const titleStyle = {
            color: '#EEE',
            fontWeight: 500,
        };

        const series = new TimeSeries({
            name: 'IPC Indicator',
            columns: ['time', 'value'],
            points: resultObj,
        });

        return (
            <div className="GBMGraph">
                <Header />
                {(resultObj.length > 0) ?
                    <ChartContainer
                        title={title}
                        style={chartStyle}
                        timeRange={series.range()}
                        timeAxisStyle={axisStyle}
                        titleStyle={titleStyle}
                        width={width}
                        height={height}
                    >
                        <ChartRow height="300">
                            <YAxis
                                style={axisStyle}
                                id="price"
                                label={labelPrice}
                                labelOffset={-20}
                                showGrid
                                transition={300}
                                min={series.min()}
                                max={series.max()}
                                width="80"
                                format="$,.1f"
                                type="linear"
                            />
                            <Charts>
                                <LineChart
                                    axis="price"
                                    series={series}
                                />
                            </Charts>
                            <YAxis
                                id="axis2"
                                label={labelPrice}
                                hideAxisLine
                                transition={300}
                                style={axisStyle}
                                labelOffset={20}
                                min={series.min()}
                                max={series.max()}
                                width="80"
                                format="$,.1f"
                                type="linear"
                            />
                        </ChartRow>
                    </ChartContainer>
                    :
                    <div className="waiting">
                        <div className="loading" />
                    </div>
                }
                <div className="footer">
                    <span>{authorLabel}</span>
                </div>
            </div>
        );
    }
}

GBMGraph.propTypes = {
    resultObj: React.PropTypes.shape([]),
    getGBMData: React.PropTypes.func,
};

const mapStateToProps = state => ({
    resultObj: state.resultObj,
});

const mapDispatchToProps = dispatch => ({
    getGBMData: () => dispatch(getGBMData()),
});

module.exports = connect(mapStateToProps, mapDispatchToProps)(GBMGraph);
