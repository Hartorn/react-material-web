import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import filterProps from '../../../utils/filter-native-props';


class Switch extends Component {

    constructor(props) {
        super(props);
        this.handleOnChange = this.handleOnChange.bind(this);
    }

    handleOnChange(event) {
        if (this.props.onChange) {
            this.props.onChange(event.target.checked);
        }
    }

    render() {
        const { value, disabled, className, onChange, ...others } = this.props;
        const wrapperClass = classNames({
            'mdc-switch': true,
            'mdc-switch--disabled': disabled,
            [className]: className
        });

        return (
            <div className={wrapperClass}>
                <input type='checkbox' checked={value} className='mdc-switch__native-control' onChange={this.handleOnChange} {...filterProps(others) } />
                <div className='mdc-switch__background'>
                    <div className='mdc-switch__knob' />
                </div>
            </div>
        );
    }
}

Switch.propTypes = {
    value: PropTypes.bool.isRequired,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    onChange: PropTypes.func
};

Switch.defaultProps = {
    disabled: false,
    className: null,
    onChange: null
}

export default Switch;