import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import filterProps from '../../utils/filter-native-props';
import ripple from '../../behaviours/ripple';

const displayName = 'Button';

const propTypes = {
    label: PropTypes.string.isRequired,
    icon: PropTypes.any.isRequired,
    iconLib: PropTypes.string,
    mini: PropTypes.bool,
    plain: PropTypes.bool,
    className: PropTypes.string
};

const defaultProps = {
    iconLib: 'material-icons',
    mini: false,
    raised: false,
    plain: false,
    className: null
};

class Fab extends PureComponent {

    render() {
        const { icon, iconLib, label, mini, plain, className, ...others } = this.props;
        const fabClass = classNames({
            'mdc-fab': true,
            'mdc-fab--mini': mini,
            'mdc-fab--plain': plain,
            [className]: className,
            [iconLib]: iconLib
        });

        return (
            <button ref='nativeCb' className={fabClass} aria-label={label} {...filterProps(others)}>
                <span className='mdc-fab__icon'>
                    {icon}
                </span>
            </button>);
    }
}

Fab.displayName = displayName;
Fab.propTypes = propTypes;
Fab.defaultProps = defaultProps;

export default Fab;

const RippleFab = ripple()(Fab);
export {
    RippleFab
};

