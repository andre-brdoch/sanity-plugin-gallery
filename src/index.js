import { route } from 'part:@sanity/base/router';
import Tool from './components/Tool';

const router = route('/', [route('/:assetId')]);

export default {
  title: 'Gallery',
  name: 'gallery',
  component: Tool,
  router,
};
