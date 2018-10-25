const React = require('react');

const Header = () => (
    <div className="header">
        <div>
            <a href="https://www.gbm.com.mx/">
                <img src="https://www.gbm.com.mx/Content/Images/logo.png" alt="GBM" />
            </a>
        </div>
    </div>
);

Header.propTypes = {
    labels: React.PropTypes.arrayOf(Object),
    countryCode: React.PropTypes.string,
};

module.exports = Header;
