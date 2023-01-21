import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { takePictures } from './takePictures';
import { createMarkup } from './createMarkup';

const searchForm = document.querySelector('.search-form');
export const input = document.querySelector('.search-form input');
export const gallery = document.querySelector('.gallery');
const guard = document.querySelector('.js-guard');
export let page = 1;

const lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captionsData: 'alt',
});

const options = {
  root: null,
  rootMargin: '300px',
  threshold: 1.0,
};
const observer = new IntersectionObserver(onLoad, options);

searchForm.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  const inputValue = input.value;

  takePictures(inputValue)
    .then(resp => {
      if (!resp.totalHits) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      if (resp.totalHits !== 0) {
        Notiflix.Notify.success(`Hooray! We found ${resp.totalHits} images.`);
      }

      gallery.innerHTML = '';
      createMarkup(resp);
      observer.observe(guard);
    })
    .catch(err => {
      console.log(err);
    });
}

function onLoad(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      page += 1;
      takePictures(page).then(resp => {
        createMarkup(resp);

        const totalPage = resp.totalHits / 40;
        if (page > totalPage && totalPage !== 0) {
          observer.unobserve(guard);
          Notiflix.Notify.failure(
            "We're sorry, but you've reached the end of search results."
          );
        }
      });
    }
  });
}
