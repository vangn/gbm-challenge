const React = require('react');
const connect = require('react-redux').connect;

const Login = require('./Login');
const GBMGraph = require('./GBMGraph');

const GBM_FLOWS = require('../../shared/domain/constants/gbm-flows');

class App extends React.Component {
    render() {
        return (
            (() => {
                switch (this.props.sectionId) {
                    case GBM_FLOWS.SHOW_LOGIN:
                        return <Login />;
                    case GBM_FLOWS.SHOW_GRAPH:
                        return <GBMGraph />;
                    default :
                        return '';
                }
            })()
        );
    }
}

App.propTypes = {
    sectionId: React.PropTypes.number,
};

const mapStateToProps = state => ({
    sectionId: state.sectionId,
});

module.exports = connect(mapStateToProps, null)(App);
