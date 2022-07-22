import './util.js';
import './thumbnails.js';
import './full-size.js';
import './upload-form.js';
import './photo-editor.js';
import './upload-messages.js';
import './sorting-filters.js';
import './upload-image.js';
import {createThumbnails} from './thumbnails.js';
import {setUserFormSubmit} from './upload-form.js';
import {overlayClose} from './upload-form.js';
import {getData} from './api.js';
import {setFilters} from './sorting-filters.js';
import {debounce} from './util.js';

const RERENDER_DELAY = 500;

getData((thumbnails) => {
  createThumbnails(thumbnails);
  setFilters(thumbnails, debounce(createThumbnails, RERENDER_DELAY));
});

setUserFormSubmit(overlayClose);
