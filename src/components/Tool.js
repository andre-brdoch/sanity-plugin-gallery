import React from 'react';
import DefaultDialog from 'part:@sanity/components/dialogs/default';
import Spinner from 'part:@sanity/components/loading/spinner';
import { StateLink, withRouterHOC } from 'part:@sanity/base/router';
import client from 'part:@sanity/base/client';
import styles from './Tool.css';

const Dialog = props => {
  const { image, onClose } = props;
  const { assetId } = image;

  return (
    <DefaultDialog title={assetId} size="large" onClose={onClose} onClickOutside={onClose}>
      {image && <img className={styles.dialogImg} src={`${image.url}?auto=format`} alt={assetId} />}

      {!image && 'Image not found :/'}
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
        <StateLink state={{ assetId }} key={assetId}>
          <img src={src} alt={assetId} className={styles.img} />
        </StateLink>
      );
    })
    : 'No images found :(';

  return (
    <div className={styles.root}>
      <h1>Image Gallery</h1>

      <div className={styles.grid}>{isLoaded ? gallery : placeholders}</div>

      {selectedAssetId && <Dialog image={getImage(selectedAssetId)} onClose={closeDialog} />}
    </div>
  );
};

export default withRouterHOC(Tool);
