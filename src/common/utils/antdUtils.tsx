import React from 'react';
import { StatusTag } from 'common/components';

interface IStatusColumnConfig {
  title?: string;
  dataIndex?: string;
  trueValue?: any;
  falseValue?: any;
  trueText?: string;
  falseText?: string;
  trueColor?: string;
  falseColor?: string;
  haveFilter?: boolean;
}
export const generateStatusTableColumn = (
  {
    title = 'Status',
    dataIndex = 'status',
    trueValue = true,
    falseValue = false,
    trueText = 'active',
    falseText = 'inactive',
    trueColor = 'green',
    falseColor = 'red',
    haveFilter = true,
  }: IStatusColumnConfig,
) => {
  type TRecordType = { [dataIndex: string]: boolean };
  return {
    title,
    key: 'status',
    align: 'center',
    render: (record: TRecordType) => (
      <StatusTag
        status={record[dataIndex]}
        trueValue={trueValue}
        falseValue={falseValue}
        trueText={trueText}
        falseText={falseText}
        trueColor={trueColor}
        falseColor={falseColor}
      />
    ),
    filters: haveFilter ? [{
      text: trueText,
      value: trueValue,
    }, {
      text: falseText,
      value: falseValue,
    }] : undefined,
    filterMultiple: false,
    onFilter: haveFilter ? ((value: any, record: TRecordType) => record[dataIndex] === value) : undefined,
  } as const;
};