
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import filterProps from '../../utils/filter-native-props';

const Grid = ({ children, className, ...others }) => (
    <div className={classnames({ 'mdc-layout-grid': true, [className]: className })} {...filterProps(others)}>
        {children}
    </div>
);

Grid.displayName = 'Grid';
Grid.propTypes = {
    className: PropTypes.string,
    children: PropTypes.any
};
Grid.defaultProps = {
    className: null,
    children: null
};


const Cell = ({ children, className, order, position, size, phoneSize, tabletSize, desktopSize, ...others }) => (
    <div
        className={classnames({
            'mdc-layout-grid__cell': true,
            [`mdc-layout-grid__cell--span-${size}`]: size,
            [`mdc-layout-grid__cell--span-${phoneSize}-phone`]: phoneSize,
            [`mdc-layout-grid__cell--span-${tabletSize}-tablet`]: tabletSize,
            [`mdc-layout-grid__cell--span-${desktopSize}-desktop`]: desktopSize,
            [`mdc-layout-grid__cell--order-${order}`]: order,
            [`mdc-layout-grid__cell--align-${position}`]: position,
            [className]: className
        })}
        {...filterProps(others)}
    >
        {children}
    </div>
);

Cell.displayName = 'Cell';
Cell.propTypes = {
    className: PropTypes.string,
    children: PropTypes.any,
    order: PropTypes.number,
    position: PropTypes.oneOf('top', 'middle', 'bottom'),
    size: PropTypes.number,
    phoneSize: PropTypes.number,
    tabletSize: PropTypes.number,
    desktopSize: PropTypes.number
};
Cell.defaultProps = {
    className: null,
    children: null,
    order: null,
    position: null,
    size: null,
    phoneSize: null,
    tabletSize: null,
    desktopSize: null
};

export {
    Grid,
    Cell
};