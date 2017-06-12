import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { isEqual } from 'lodash';
import { MDCIconToggle } from '@material/icon-toggle';

import filterProps from '../../utils/filter-native-props';
// import ripple from '../../behaviours/ripple';

const displayName = 'IconToggle';

const propTypes = {
    value: PropTypes.bool.isRequired,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    toggleOn: PropTypes.shape({
        label: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        cssClass: PropTypes.string
    }).isRequired,
    toggleOff: PropTypes.shape({
        label: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        cssClass: PropTypes.string
    }).isRequired,
    className: PropTypes.string
};

const defaultProps = {
    disabled: false,
    className: null,
    onChange: null
};

class IconToggle extends PureComponent {
    constructor(props) {
        super(props);
        this.handleToggle = this.handleToggle.bind(this);
    }

    componentDidMount() {
        this.iconToggle = new MDCIconToggle(this.refs.nativeCb, this.iconToggleFoundation);
        this.iconToggle.foundation_.toggle(this.props.value);
        this.iconToggle.foundation_.setDisabled(this.props.disabled);
        this.iconToggle.listen('MDCIconToggle:change', this.handleToggle);
    }

    componentWillUnmount() {
        this.iconToggle.unlisten('MDCIconToggle:change');
        this.iconToggle.destroy();
    }

    componentWillReceiveProps(nextProps) {
        if (!isEqual(nextProps.toggleOn, this.props.toggleOn) || !isEqual(nextProps.toggleOn, this.props.toggleOn)) {
            this.iconToggle.foundation_.refreshToggleData();
        }
        if (nextProps.value !== this.props.value) {
            this.iconToggle.foundation_.toggle(nextProps.value);
        }
        if (nextProps.disabled !== this.props.disabled) {
            this.iconToggle.foundation_.setDisabled(nextProps.disabled);
        }
    }


    handleToggle({ detail: { isOn } }) {
        if (this.props.onChange) {
            this.props.onChange(isOn);
        }
    }

    render() {
        const { value, disabled, toggleOn, toggleOff, className, ...others } = this.props;
        const { label, content, cssClass } = value ? toggleOn : toggleOff;
        const toggleClass = classNames({
            'mdc-icon-toggle': true,
            'material-icons': true,
            [className]: className,
            [cssClass]: cssClass
        });

        return (
            <i ref='nativeCb' className={toggleClass} role='button' aria-pressed='false'
                aria-label={label} tabIndex={disabled ? -1 : 0}
                data-toggle-on={JSON.stringify(toggleOn)}
                data-toggle-off={JSON.stringify(toggleOff)}
                {...filterProps(others)}
            >
                {content}
            </i>
        );
    }
}

IconToggle.displayName = displayName;
IconToggle.propTypes = propTypes;
IconToggle.defaultProps = defaultProps;

export default IconToggle;

// const RippleIconToggle = ripple()(IconToggle);
// export {
//     RippleIconToggle
// };