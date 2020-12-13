import React from 'react';
import Spinner from 'part:@sanity/components/loading/spinner';
import client from 'part:@sanity/base/client';
import styles from './Tool.css';

export default () => {
  const [images, setImages] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);
  if (!isLoaded) {
    const query = '*[_type == "sanity.imageAsset"]';
    client
      .fetch(query)
      .then(imageAssets => {
        console.log(imageAssets);
        setImages(imageAssets);
        setIsLoaded(true);
      })
      .catch(() => setIsLoaded(true));
  }

  const placeholders = [1, 2, 3].map(i => (
    <div className={styles.imgPlaceholder} key={i}>
      <Spinner center />
    </div>
  ));

  const gallery = images.length > 0
    ? images.map(image => {
      const { url, assetId } = image;
      const src = `${url}?w=1000&h=600&fit=crop&crop=center&auto=format`;
      return <img src={src} alt={assetId} key={assetId} className={styles.img} />;
    })
    : 'No images found :(';

  return (
    <div className={styles.root}>
      <h1>Image Gallery</h1>

      <div className={styles.grid}>{isLoaded ? gallery : placeholders}</div>
    </div>
  );
};
