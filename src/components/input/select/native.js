import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// import { MDCSelect } from '@material/select';

import filterProps from '../../../utils/filter-native-props';
import { translate } from '../../../config';

class SelectNative extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange() {
        const selectedOptions = this.selectNative.selectedOptions;
        let newValue = null;
        if (this.props.multiple) {
            newValue = selectedOptions.map(elt => elt.value);
        } else if (selectedOptions.length > 0) {
            newValue = selectedOptions[0].value;
            newValue = newValue === '' ? null : newValue;
        }
        if (this.props.onChange) {
            this.props.onChange(newValue);
        }
    }

    getSelectedIndex(value, options) {
        return options.findIndex(({ id }) => value === id)
    }

    renderOption(values, { id, label }, multiple) {
        const selectedValues = multiple ? values : [values];
        const additionalProps = {};
        const isSelected = selectedValues.indexOf(id) !== -1;
        if (isSelected) {
            additionalProps.selected = true;
        }
        return (
            <option value={id} {...additionalProps}>{label}</option>
        );
    }

    renderOptions(value, options, pickLabel, required, multiple) {
        const additionalProps = {};
        if (required) {
            additionalProps.disabled = 'true';
        }

        const optionsElts = [<option key='default' value='' default {...additionalProps}>{translate(pickLabel)}</option>];
        return optionsElts.concat(options.map(opt => (this.renderOption(value, opt, multiple))));
    }

    render() {
        const { value, onChange, options, pickLabel, disabled, className, required, ...others } = this.props;
        const customClassname = classNames({
            'mdc-select': true,
            'mdc-select--disabled': disabled,
            [className]: className
        });
        // const tabIndex = disabled ? -1 : 0;
        const optionalProps = {};
        if (disabled) {
            optionalProps.disabled = true;
        }
        return (
            <select ref='nativeCb' className={customClassname} onChange={this.handleChange} {...optionalProps} {...filterProps(others)}>
                {this.renderOptions(value, options, pickLabel, required)}
            </select>
        );
    }
}

SelectNative.propTypes = {
    pickLabel: PropTypes.string,
    value: PropTypes.oneOf(PropTypes.string, PropTypes.arrayOf(PropTypes.string)).isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired
    })).isRequired,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    required: PropTypes.bool,
    mutiple: PropTypes.bool
};

SelectNative.defaultProps = {
    pickLabel: 'mdc.select.pickLabel',
    disabled: false,
    className: null,
    required: false,
    multiple: false
};

export default SelectNative;