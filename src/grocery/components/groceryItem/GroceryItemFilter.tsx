import React from 'react';
import {
  Row, Col, Form,
} from 'antd';
import { GROCERY_ITEM_TYPE } from 'common/constants';
import {
  InputField, SubmitCancelButtonField, SelectorField, DateRangePickerField,
} from 'common/form';

export interface IFilterValue {
  name?: string;
  type?: string;
  expiration_before?: string;
  expiration_after?: string;
}

interface IOwnProps {
  onFilter: (values: IFilterValue) => void;
  onResetFilter?: () => void;
}
const GroceryItemFilter: React.FC<IOwnProps> = ({ onFilter, onResetFilter }) => {
  const [form] = Form.useForm();
  function onReset() {
    form.resetFields();
    onFilter({});
    if (onResetFilter) onResetFilter();
  }

  return <Form
    onFinish={(values) => {
      if (values.expiration_range && values.expiration_range.length >= 2) {
        values.expiration_after = values.expiration_range[0].format();
        values.expiration_before = values.expiration_range[1].format();
        delete values.expiration_range;
      }
      onFilter(values);
    }}
    form={form}
  >
    <Row gutter={16}>
      <Col span={6}><InputField name="name" label="Name" layout={{}} /></Col>
      <Col span={6}><SelectorField name="type" label="Type" options={Object.values(GROCERY_ITEM_TYPE)} layout={{}} /></Col>
      <Col span={6}><DateRangePickerField label="Expiration" name="expiration_range" layout={{}} /></Col>
      <Col span={6}>
        <SubmitCancelButtonField
          offset={0}
          onCancel={onReset}
          submitTitle="Filter"
          cancelTitle="Reset"
        />
      </Col>
    </Row>
  </Form>;
};

export default GroceryItemFilter;
