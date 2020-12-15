import React from 'react';
import DefaultDialog from 'part:@sanity/components/dialogs/default';
import Spinner from 'part:@sanity/components/loading/spinner';
import { StateLink, withRouterHOC } from 'part:@sanity/base/router';
import client from 'part:@sanity/base/client';
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

const Dialog = props => {
  const { image, isLoaded, onClose } = props;
  const title = image ? image.assetId : 'Not found';

  return (
    <DefaultDialog title={title} size="large" onClose={onClose} onClickOutside={onClose}>
      {isLoaded && image && (
        <img className={styles.dialogImg} src={`${image.url}?auto=format`} alt={title} />
      )}

      {isLoaded && !image && 'Image not found :/'}

      {!isLoaded && <Spinner center />}
    </DefaultDialog>
  );
};

const Tool = props => {
  const [images, setImages] = React.useState([]);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const { router } = props;
  const selectedAssetId = router.state.assetId;

  const closeDialog = () => router.navigate({});

  const getImage = assetId => images.find(img => img.assetId === assetId);

  if (!isLoaded) {
    console.log('go fetch');
    const query = '*[_type == "sanity.imageAsset"]';
    client
      .fetch(query)
      .then(imageAssets => {
        setImages(imageAssets);
        setIsLoaded(true);
      })
      .catch(() => setIsLoaded(true));
  }

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
