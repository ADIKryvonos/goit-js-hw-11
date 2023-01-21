import axios from 'axios';
import { input } from './index';
import { page } from './index';

export async function takePictures() {
  const URL = 'https://pixabay.com/api/';
  const API_KEY = '32940895-a059968cc230e91a3d13d319b';
  const response = await axios.get(
    `${URL}?key=${API_KEY}&q=${input.value}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`
  );
  const picture = await response.data;
  return picture;
}
