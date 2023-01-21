import 'simplelightbox/dist/simple-lightbox.min.css';
import { takePictures } from './takePictures';

import { gallery } from './index';

const lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captionsData: 'alt',
});

export function createMarkup(picture) {
  const marcup = picture.hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card"><a href="${largeImageURL}">
      <img src="${webformatURL}" alt="${tags}" width="480" heigth = "320" loading="lazy" /></a>
      <div class="info">
        <p class="info-item">
          <b>Likes</b>${likes}
        </p>
        <p class="info-item">
          <b>Views</b>${views}
        </p>
        <p class="info-item">
          <b>Comments</b>${comments}
        </p>
        <p class="info-item">
          <b>Downloads</b>${downloads}
        </p>
      </div>
    </div>`;
      }
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', marcup);
  lightbox.refresh();
}
