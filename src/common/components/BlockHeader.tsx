import React from 'react';
import PageHeader from './pageHeaders';

interface IBlockHeaderProps {
  title: React.ReactNode;
  extra?: React.ReactNode;
}
const BlockHeader: React.FC<IBlockHeaderProps> = ({ title, extra }) => {
  return <PageHeader
    title={title}
    titleExtra={extra}
    style={{
      fontSize: '1rem',
      paddingLeft: 0,
      color: 'rgba(0, 0, 0, 0.85)',
    }}
  />;
};

export default BlockHeader;
