/* eslint-disable react/no-array-index-key */
import React from 'react';

import Text from './slices/Text';

/**
 * Post slice zone component
 */
const SliceZone = ({ content }) =>
  content.map((slice, index) => {
    switch (slice.type) {
      case 'paragraph':
        return <Text slice={slice} key={`slice-${index}`} />;

      default:
        return null;
    }
  });

export default SliceZone;
