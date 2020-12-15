import React from 'react';
import client from 'part:@sanity/base/client';
import { withRouterHOC } from 'part:@sanity/base/router';
import Dialog from './Dialog';
import Gallery from './Gallery';
import styles from './Tool.css';

const Tool = props => {
  const [images, setImages] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const { router } = props;
  const selectedAssetId = router.state.assetId;

  const fetchImages = () => {
    console.log('go fetch');
    const query = '*[_type == "sanity.imageAsset"]';
    client
      .fetch(query)
      .then(imageAssets => {
        setImages(imageAssets);
        setIsLoaded(true);
      })
      .catch(() => setIsLoaded(true));
  };

  const closeDialog = () => router.navigate({});

  const getImage = assetId => images.find(img => img.assetId === assetId);

  if (!isLoaded) fetchImages();

  return (
    <div className={styles.root}>
      <h1>Image Gallery</h1>

      <Gallery images={images} isLoaded={isLoaded} />

      {selectedAssetId && (
        <Dialog image={getImage(selectedAssetId)} isLoaded={isLoaded} onClose={closeDialog} />
      )}
    </div>
  );
};

export default withRouterHOC(Tool);
