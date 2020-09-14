import { RichText } from 'prismic-reactjs';
import React from 'react';

const Text = ({ slice }) => (
  <div className="post-part single container">{RichText.render([slice])}</div>
);

export default Text;
