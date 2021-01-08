import React from 'react';
import { Tag } from 'antd';

type Props = {
  status: boolean;
  trueText?: string;
  falseText?: string;
  trueColor?: string;
  falseColor?: string;
  trueValue?: any;
  falseValue?: any;
};
const StatusTag: React.FC<Props> = ({
  status,
  trueText = 'Active',
  falseText = 'Inactive',
  trueColor = 'green',
  falseColor = 'red',
  trueValue = true,
}) => {
  return <Tag color={status === trueValue ? trueColor : falseColor}>
    {status === trueValue ? trueText : falseText}
  </Tag>;
};

export default StatusTag;
