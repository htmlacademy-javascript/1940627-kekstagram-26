import './util.js';
import './data.js';
import './thumbnails.js';
import './full-size.js';
import './upload-form.js';
import './photo-editor.js';
import './upload-messages.js';
import {createThumbnails} from './thumbnails.js';
import {setUserFormSubmit} from './upload-form.js';
import {overlayClose} from './upload-form.js';
import {getData} from './api.js';


getData(createThumbnails);

setUserFormSubmit(overlayClose);
