import React from 'react';
import { CodeBlock, dracula, monokaiSublime } from 'react-code-blocks';

// import { Container } from './styles';

const Code = ({ slice }) => {
  return (
    <CodeBlock
      text={slice.text}
      language="php"
      showLineNumbers={false}
      theme={dracula}
    />
  );
};

export default Code;
