import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import uuid from 'uuid/v4';
import { MDCDialog } from '@material/dialog';

import filterProps from '../../utils/filter-native-props';
import { translate } from '../config';

const displayName = 'Button';

const propTypes = {
    title: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    onAccept: PropTypes.func.isRequired,
    children: PropTypes.any.isRequired,
    scrollable: PropTypes.bool,
    acceptLabel: PropTypes.string,
    cancelLabel: PropTypes.string,
    className: PropTypes.string
};

const defaultProps = {
    scrollable: false,
    acceptLabel: 'Confirm',
    cancelLabel: 'Cancel',
    className: null
};


class Dialog extends PureComponent {

    initDialog() {
        this.dialog = new MDCDialog(this.refs.nativeCb);
        this.dialog.show();
        this.dialog.listen('MDCDialog:accept', this.props.onAccept);
        this.dialog.listen('MDCDialog:cancel', this.props.onCancel);
    }

    closeDialog() {
        if (this.dialog.isOpen) {
            this.dialog.close();
        }
        this.dialog.unlisten('MDCDialog:accept', this.props.onAccept);
        this.dialog.unlisten('MDCDialog:cancel', this.props.onCancel);

        this.dialog.destroy();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.open && !this.props.open) {
            this.closeDialog();
        }
        if (!prevProps.open && this.props.open) {
            this.initDialog();
        }
    }

    componentDidMount() {
        if (this.props.open) {
            this.initDialog();
        }
    }

    componentWillUnmount() {
        if (this.props.open) {
            this.closeDialog();
        }
    }


    render() {
        const { title, scrollable, className, acceptLabel, cancelLabel, ...others } = this.props;
        if (!this.props.open) {
            return null;
        }
        const sectionClass = classNames({
            'mdc-dialog__body': true,
            'mdc-dialog__body--scrollable': scrollable
        });
        const asideClass = classNames({
            'mdc-dialog': true,
            [className]: className
        });
        let labelledby = uuid();
        let describedby = uuid();

        return (
            <aside
                ref='nativeCb'
                className={asideClass}
                role='alertdialog'
                aria-labelledby={labelledby}
                aria-describedby={describedby}
                {...filterProps(others)}
            >
                <div className='mdc-dialog__surface'>
                    <header className='mdc-dialog__header'>
                        <h2 id={labelledby} className='mdc-dialog__header__title'>
                            {translate(title)}
                        </h2>
                    </header>
                    <section id={describedby} className={sectionClass}>
                        {this.props.children}
                    </section>
                    <footer className='mdc-dialog__footer'>
                        <button type='button' className='mdc-button mdc-dialog__footer__button mdc-dialog__footer__button--cancel'>{translate(cancelLabel)}</button>
                        <button type='button' className='mdc-button mdc-dialog__footer__button mdc-dialog__footer__button--accept'>{translate(acceptLabel)}</button>
                    </footer>
                </div>
                <div className='mdc-dialog__backdrop' />
            </aside>);
    }
}

Dialog.displayName = displayName;
Dialog.propTypes = propTypes;
Dialog.defaultProps = defaultProps;

export default Dialog;