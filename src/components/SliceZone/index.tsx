/* eslint-disable react/no-array-index-key */
import React from 'react';

import Code from './slices/Code';
import DefaultImage from './slices/ImageWithCaption/DefaultImage';
import Text from './slices/Text';

/**
 * Post slice zone component
 */
const SliceZone = ({ content }) =>
  content.map((slice, index) => {
    switch (slice.type) {
      case 'image':
        return (
          <DefaultImage
            imageUrl={slice.url}
            caption={slice.alt}
            key={`slice-${index}`}
          />
        );
      case 'paragraph':
        return <Text slice={slice} key={`slice-${index}`} />;
      case 'preformatted':
        return <Code slice={slice} key={`slice-${index}`} />;
      default:
        return null;
    }
  });

export default SliceZone;
