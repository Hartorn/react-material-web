import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import filterProps from '../../utils/filter-native-props';
import ripple from '../../behaviours/ripple';

const displayName = 'Button';

const propTypes = {
    label: PropTypes.string.isRequired,
    dense: PropTypes.bool,
    raised: PropTypes.bool,
    compact: PropTypes.bool,
    primary: PropTypes.bool,
    accent: PropTypes.bool,
    className: PropTypes.string
};

const defaultProps = {
    dense: false,
    raised: false,
    compact: false,
    primary: false,
    accent: false,
    className: null
};

//https://github.com/material-components/material-components-web/tree/master/packages/mdc-button
//https://material-components-web.appspot.com/button.html

class Button extends PureComponent {

    render() {
        const { label, dense, raised, compact, primary, accent, className, ...others } = this.props;
        const btnClass = classNames({
            'mdc-button': true,
            'mdc-button--dense': dense,
            'mdc-button--raised': raised,
            'mdc-button--compact': compact,
            'mdc-button--primary': primary,
            'mdc-button--accent': accent,
            [className]: className
        });

        return (
            <button ref='nativeCb' className={btnClass} {...filterProps(others)}>
                {label}
            </button>
        );
    }
}

Button.displayName = displayName;
Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;

const RippleButton = ripple()(Button);
export {
    RippleButton
};