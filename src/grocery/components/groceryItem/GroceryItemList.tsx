import React from 'react';
import { Table, Tag, Button, Divider } from 'antd';
import { IGroceryItem } from 'grocery/types';
import { localizeDateTime } from 'common/utils/stringUtils';

const columns = (
  onUpdate: (record: IGroceryItem) => void,
  onDelete: (record: IGroceryItem) => void,
) => [{
  title: 'Name',
  key: 'name',
  dataIndex: 'name',
}, {
  title: 'Type',
  key: 'type',
  dataIndex: 'type',
}, {
  title: 'Amount',
  key: 'amount',
  render: (record: IGroceryItem) => `${record.amount} ${record.unit}s`,
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
  render: (record: IGroceryItem) => (
    Date.parse(record.expiration) <= Date.now() ? <Tag color="red">YES</Tag> : <Tag color="green">NO</Tag>
  ),
}, {
  title: 'Action',
  key: 'action',
  render: (record: IGroceryItem) => <>
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
  onDelete: (record: IGroceryItem) => void;
  onUpdate: (record: IGroceryItem) => void;
  groceryItemList: any[];
  excludeColumnKey?: TColumeKey[];
  paginationPosition?: ('topLeft' | 'topCenter' | 'topRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight')[];
}

type Props = IOwnProps;

const GroceryItemList: React.FC<Props> = ({
  groceryItemList, excludeColumnKey, paginationPosition, onUpdate, onDelete,
}) => {
  let actualColumns = columns(onUpdate, onDelete).slice();
  if (excludeColumnKey && excludeColumnKey.length > 0) {
    actualColumns = columns(onUpdate, onDelete).filter(column => !excludeColumnKey.includes(column.key));
  }
  return <React.Fragment>
    <Table
      rowKey={(record: any) => record.id}
      columns={actualColumns}
      dataSource={groceryItemList}
      pagination={{
        position: paginationPosition,
        pageSizeOptions: ['10', '20', '30', '40'],
        total: groceryItemList.length,
        showSizeChanger: true,
        showTotal: (totalNumber, range) => `Range ${range[0]}-${range[1]} of ${totalNumber}`,
      }}
      scroll={{ x: 1500 }}
    />
  </React.Fragment>;
};

export default GroceryItemList;
