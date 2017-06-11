import {EMPTY_FOLDER_INDICATOR} from '../../constants/constants';
const path = require('path');
const del = require('del');

export default function removeEmptyIndicatorFiles(rootDirectory: string) {
    del.sync([path.join(rootDirectory, `**/${EMPTY_FOLDER_INDICATOR}`)], {force: true});
}