import React from 'react';
import { Descriptions } from 'antd';
import { DescriptionsProps } from 'antd/lib/descriptions';

interface IProps {
  title?: React.ReactNode;
  titleExtra?: React.ReactNode;
  column?: number;
  data: {
    label: React.ReactNode;
    value: React.ReactNode;
    span?: number;
  }[];
  size?: DescriptionsProps['size'];
  bordered?: DescriptionsProps['bordered'];
  style?: DescriptionsProps['style'];
}
const DescriptionBlock: React.FC<IProps> = ({
  title, titleExtra, column, data, size, bordered, style,
}) => {
  const actualTitle = (
    <div className="flex-sp-between-justify-container">
      <div>{title}</div>
      <div>{titleExtra}</div>
    </div>
  );
  return <Descriptions
    title={actualTitle}
    column={column}
    size={size}
    bordered={bordered}
    style={style}
  >
    {data.map(entry => (
      <Descriptions.Item
        label={entry.label}
        span={entry.span}
        key={String(entry.label)}
      >
        {entry.value}
      </Descriptions.Item>
    ))}
  </Descriptions>;
};

export default DescriptionBlock;
