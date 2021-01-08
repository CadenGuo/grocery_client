import React from 'react';
import { Table, Tag, Button, Divider } from 'antd';
import { IDrink } from 'grocery/types';
import { localizeDateTime } from 'common/utils/stringUtils';

const columns = (
  onUpdate: (record: IDrink) => void,
  onDelete: (record: IDrink) => void,
) => [{
  title: 'Name',
  key: 'name',
  dataIndex: 'name',
}, {
  title: 'Amount',
  key: 'amount',
  render: (record: IDrink) => `${record.amount} ${record.unit}s`,
}, {
  title: 'Carbonated',
  key: 'carbonated',
  render: (record: IDrink) => (
    record.carbonated ? <Tag color="blue">YES</Tag> : <Tag color="green">NO</Tag>
  ),
}, {
  title: 'Alcoholic',
  key: 'alcoholic',
  render: (record: IDrink) => (
    record.alcoholic ? <Tag color="blue">YES</Tag> : <Tag color="green">NO</Tag>
  ),
}, {
  title: 'Expires At',
  key: 'expires_at',
  dataIndex: 'expiration',
  render: (data: string) => localizeDateTime(data),
}, {
  title: 'Created At',
  key: 'created_at',
  dataIndex: 'created_at',
  render: (data: string) => localizeDateTime(data),
}, {
  title: 'Updated At',
  key: 'updated_at',
  dataIndex: 'updated_at',
  render: (data: string) => localizeDateTime(data),
}, {
  title: 'Expired',
  key: 'expired',
  render: (record: IDrink) => (
    Date.parse(record.expiration) <= Date.now() ? <Tag color="red">YES</Tag> : <Tag color="green">NO</Tag>
  ),
}, {
  title: 'Action',
  key: 'action',
  render: (record: IDrink) => <>
    <Button
      type="link"
      onClick={() => onUpdate(record)}
    >
      Update
    </Button>
    <Divider type="vertical" />
    <Button
      type="link"
      onClick={() => onDelete(record)}
    >
      Delete
    </Button>
  </>,
}] as const;

type TColumeKey = ReturnType<typeof columns>[number]['key'];

interface IOwnProps {
  onDelete: (record: IDrink) => void;
  onUpdate: (record: IDrink) => void;
  drinkList: any[];
  excludeColumnKey?: TColumeKey[];
  paginationPosition?: ('topLeft' | 'topCenter' | 'topRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight')[];
}

type Props = IOwnProps;

const DrinkList: React.FC<Props> = ({
  drinkList, excludeColumnKey, paginationPosition, onUpdate, onDelete,
}) => {
  let actualColumns = columns(onUpdate, onDelete).slice();
  if (excludeColumnKey && excludeColumnKey.length > 0) {
    actualColumns = columns(onUpdate, onDelete).filter(column => !excludeColumnKey.includes(column.key));
  }
  return <React.Fragment>
    <Table
      rowKey={(record: any) => record.id}
      columns={actualColumns}
      dataSource={drinkList}
      pagination={{
        position: paginationPosition,
        pageSizeOptions: ['10', '20', '30', '40'],
        total: drinkList.length,
        showSizeChanger: true,
        showTotal: (totalNumber, range) => `Range ${range[0]}-${range[1]} of ${totalNumber}`,
      }}
      scroll={{ x: 1500 }}
    />
  </React.Fragment>;
};

export default DrinkList;
