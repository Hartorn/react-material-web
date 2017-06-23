import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { MDCSelect } from '@material/select';

import filterProps from '../../../utils/filter-native-props';
import { translate } from '../../../config';

class SelectCustom extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.selectMdc = new MDCSelect(this.refs.nativeCb);
        this.selectMdc.listen('MDCSelect:change', this.handleChange);
    }

    componentWillUnmount() {
        this.selectMdc.unlisten('MDCSelect:change');
        this.selectMdc.destroy();
    }

    componentWillReceiveProps({ value, options }) {
        this.selectMdc.selectedIndex = this.getSelectedIndex(value, options) + 1;
    }

    handleChange() {
        const selectedOptions = this.selectMdc.selectedOptions;
        let newValue = null;
        if (selectedOptions.length > 0) {
            newValue = selectedOptions[0].id;
            newValue = newValue === '' ? null : newValue;
        }
        if (this.props.onChange) {
            this.props.onChange(newValue);
        }
    }

    getSelectedIndex(value, options) {
        return options.findIndex(({ id }) => value === id)
    }

    renderOption(selectedValue, { id, label }) {
        const additionalProps = {};
        const isSelected = selectedValue === id;
        if (isSelected) {
            additionalProps['aria-selected'] = true;
        }
        return (
            <li className='mdc-list-item' role='option' key={id} id={id} tabIndex='0' {...additionalProps}>{label}</li>
        );
    }

    renderOptions(value, options, pickLabel, required) {
        const additionalProps = {};
        if (required) {
            additionalProps['aria-disabled'] = 'true';
        }
        return (
            <ul className='mdc-list mdc-simple-menu__items'>
                <li className='mdc-list-item' role='option' {...additionalProps}>
                    {translate(pickLabel)}
                </li>
                {options.map(opt => (this.renderOption(value, opt)))}
            </ul>
        );
    }

    render() {
        const { value, onChange, options, pickLabel, disabled, className, required, ...others } = this.props;
        const customClassname = classNames({
            'mdc-select': true,
            'mdc-select--disabled': disabled,
            [className]: className
        });
        const tabIndex = disabled ? -1 : 0;
        const optionalProps = {};
        if (disabled) {
            optionalProps['aria-disabled'] = 'true';
        }
        let selectedText = value ? (options.find(opt => opt.id === value) || {}).label : null;
        return (
            <div ref='nativeCb' className={customClassname} role='listbox' tabIndex={tabIndex} {...filterProps(others) }>
                <span className='mdc-select__selected-text'>{selectedText ? selectedText : translate(pickLabel)}</span>
                <div className='mdc-simple-menu mdc-select__menu'>
                    {this.renderOptions(value, options, pickLabel, required)}
                </div>
            </div>
        );
    }
}

SelectCustom.propTypes = {
    pickLabel: PropTypes.string,
    value: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired
    })).isRequired,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    required: PropTypes.bool
};

SelectCustom.defaultProps = {
    pickLabel: 'mdc.select.pickLabel',
    disabled: false,
    className: null,
    required: false
};

export default SelectCustom;