const React = require('react');
const connect = require('react-redux').connect;
const Header = require('./Header');

const Error = ({ error }) => (
    <div className="error">
        <Header />
        <span>{error}</span>
    </div>
);

Error.propTypes = {
    error: React.PropTypes.string,
};

const mapStateToProps = state => ({
    error: state.error,
});

module.exports = connect(mapStateToProps, null)(Error);
