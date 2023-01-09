import React from 'react';
import { Card } from 'antd';
import BoxPanel from '../BoxPanel';

import './index.less';

const BoxCard = ({ children, title, schema }) => {
  if (!title) {
    return (
      <BoxPanel schema={schema}>
        {children}
      </BoxPanel>
    )
  }
  return (
    <Card
      className='fr-card'
      title={
        <>
          {title}
          <span className='fr-desc ml2'>
            {schema?.description ? `( ${schema.description} )` : ''}
          </span>
        </>
      }
      hoverable={true}
    >
      {children}
    </Card>
  );
}

export default BoxCard;
