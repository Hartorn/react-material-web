import { entries } from 'lodash';

import eventAttr from './attributes/react-event';
import htmlAttr from './attributes/react-html';
import svgAttr from './attributes/react-svg';

const eventAttrCapture = eventAttr.map(elt => elt + 'Capture');

/**
 * Filter the incoming props, so only valid props for native HTML elements are passed through.
 * 
 * @param {object} props the incoming props
 * @param {boolean} [checkSvg=false] if svg attributes should be kept
 * @returns {object} an object with valid props
 */
function checkProps(props, checkSvg = false) {
    return entries(props).reduce((acc, [key, value]) => {
        if (key.startsWith('data-') || key.startsWith('aria-') ||
            eventAttr.indexOf(key) !== -1
            || eventAttrCapture.indexOf(key) !== -1
            || htmlAttr.indexOf(key) !== -1
            || (checkSvg && svgAttr.indexOf(key) !== -1)) {
            acc[key] = value;
        }
        return acc;
    }, {});
}

export default checkProps; 