import React from 'react';
import DefaultDialog from 'part:@sanity/components/dialogs/default';
import Spinner from 'part:@sanity/components/loading/spinner';
import styles from './Tool.css';

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

export default Dialog;
