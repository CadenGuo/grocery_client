import React from 'react';
import {
  Row, Col, Form,
} from 'antd';
import {
  InputField, SubmitCancelButtonField, SelectorField, DateRangePickerField,
} from 'common/form';

export interface IFilterValue {
  name?: string;
  carbonated?: boolean;
  alcoholic?: boolean;
  expiration_before?: string;
  expiration_after?: string;
}

interface IOwnProps {
  onFilter: (values: IFilterValue) => void;
  onResetFilter?: () => void;
}
const DrinkFilter: React.FC<IOwnProps> = ({ onFilter, onResetFilter }) => {
  const [form] = Form.useForm();
  function onReset() {
    form.resetFields();
    onFilter({});
    if (onResetFilter) onResetFilter();
  }

  const trueFalseOptions = [{
    text: 'Yes',
    value: true,
  }, {
    text: 'No',
    value: false,
  }];

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
      <Col span={6}><SelectorField name="carbonated" label="Carbonated" options={trueFalseOptions} layout={{}} /></Col>
      <Col span={6}><SelectorField name="alcoholic" label="Alcoholic" options={trueFalseOptions} layout={{}} /></Col>
      <Col span={6}><DateRangePickerField label="Expiration" name="expiration_range" layout={{}} /></Col>
      <Col span={24}>
        <SubmitCancelButtonField
          onCancel={onReset}
          submitTitle="Filter"
          cancelTitle="Reset"
        />
      </Col>
    </Row>
  </Form>;
};

export default DrinkFilter;
