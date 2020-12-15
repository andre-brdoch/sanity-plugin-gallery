import React from 'react';
import DefaultDialog from 'part:@sanity/components/dialogs/default';
import Spinner from 'part:@sanity/components/loading/spinner';
import client from 'part:@sanity/base/client';
import styles from './Tool.css';

export default () => {
  const [images, setImages] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [selectedAssetId, setSelectedAssetId] = React.useState(null);

  const closeDialog = () => setSelectedAssetId(null);

  if (!isLoaded) {
    console.log('go fetch');
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
      return (
        <img
          src={src}
          alt={assetId}
          key={assetId}
          className={styles.img}
          onClick={() => setSelectedAssetId(assetId)}
        />
      );
    })
    : 'No images found :(';

  const Dialog = () => {
    const image = images.find(img => img.assetId === selectedAssetId);

    return (
      <DefaultDialog
        title={selectedAssetId}
        size="large"
        onClose={closeDialog}
        onClickOutside={closeDialog}
      >
        {image ? (
          <img
            className={styles.dialogImg}
            src={`${image.url}?auto=format`}
            alt={selectedAssetId}
          />
        ) : (
          'Image not found :/'
        )}
      </DefaultDialog>
    );
  };

  return (
    <div className={styles.root}>
      <h1>Image Gallery</h1>

      <div className={styles.grid}>{isLoaded ? gallery : placeholders}</div>

      {selectedAssetId && <Dialog />}
    </div>
  );
};
