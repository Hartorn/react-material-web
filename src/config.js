import { identity } from 'lodash';

const config = {
    translate: identity
};

const setTranslate = (newTranslate) => {
    config.translate = newTranslate;
};

const translate = (text) => {
    return config.translate(text);
};

export {
    setTranslate,
    translate
}