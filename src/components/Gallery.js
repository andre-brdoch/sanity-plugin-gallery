import React from 'react';
import Spinner from 'part:@sanity/components/loading/spinner';
import { StateLink } from 'part:@sanity/base/router';
import styles from './Tool.css';

const Gallery = props => {
  const { isLoaded, images } = props;
  const hasImages = images.length > 0;

  return (
    <div className={styles.grid}>
      {isLoaded
        && hasImages
        && images.map(image => {
          const { url, assetId } = image;
          const src = `${url}?w=1000&h=600&fit=crop&crop=center&auto=format`;

          return (
            <StateLink state={{ assetId }} key={assetId}>
              <img src={src} alt={assetId} className={styles.img} />
            </StateLink>
          );
        })}

      {isLoaded && !hasImages && 'No images found :('}

      {!isLoaded
        && [1, 2, 3].map(i => (
          <div className={styles.imgPlaceholder} key={i}>
            <Spinner center />
          </div>
        ))}
    </div>
  );
};

export default Gallery;
