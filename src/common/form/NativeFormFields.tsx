// tslint:disable: trailing-comma
import React from 'react';
import {
  Form, Input, Button, InputNumber, Select, DatePicker, Checkbox,
} from 'antd';
import * as FieldTypes from './types';

const { RangePicker } = DatePicker;
const { Item } = Form;

const DEFAULT_LAYOUT = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

// Overwrite default large margin bottom
export const StyledFormItem: React.FC<FieldTypes.IStyledFormItemProps> = ({
  marginBottom = '1rem', layout, rules, required, label, name, prefix, suffix, colon, style, ...props
}) => (
    <Item
      label={label}
      wrapperCol={layout?.wrapperCol}
      labelCol={layout?.labelCol}
      {...(!layout && DEFAULT_LAYOUT)}
      required={required}
      colon={colon}
      rules={[...(rules || []), { required, message: `${label || name} is required` }]}
      style={{ marginBottom, ...style }}
    >
      {prefix}
      <Item
        name={name}
        noStyle
        required={required}
        rules={[...(rules || []), { required, message: `${label || name} is required` }]}
        colon={false}
        {...props}
      >
        {props.children}
      </Item>
      {suffix}
    </Item>
  );

export const InputField: FieldTypes.TInputField = ({
  style, extraChildProps, extraFieldItemProps, ...props
}) => {
  return <StyledFormItem
    {...props}
    {...extraFieldItemProps}
  >
    <Input style={style} {...extraChildProps} />
  </StyledFormItem>;
};

export const TextAreaField: FieldTypes.TTextAreaField = ({
  style, extraChildProps, extraFieldItemProps, ...props
}) => {
  return <StyledFormItem
    {...props}
    {...extraFieldItemProps}
  >
    <Input.TextArea style={style} {...extraChildProps} />
  </StyledFormItem>;
};

export const NumberField: FieldTypes.TNumberField = ({
  style, extraChildProps, extraFieldItemProps, ...props
}) => {
  return <StyledFormItem
    {...props}
    {...extraFieldItemProps}
  >
    <InputNumber style={style} {...extraChildProps} />
  </StyledFormItem>;
};

export const CheckboxField: FieldTypes.TCheckboxField = ({
  style, extraChildProps, extraFieldItemProps, ...props
}) => {
  return <StyledFormItem
    {...props}
    {...extraFieldItemProps}
    valuePropName="checked"
  >
    <Checkbox style={style} {...extraChildProps} />
  </StyledFormItem>;
};

export const SelectorField: FieldTypes.TSelectField = ({
  style, extraChildProps, extraFieldItemProps, options, ...props
}) => {
  return <StyledFormItem
    {...props}
    {...extraFieldItemProps}
  >
    <Select
      style={style}
      showSearch
      filterOption={(input, option) => !!(option && option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0)}
      allowClear
      {...extraChildProps}
    >
      {options.map(option => (
        <Select.Option
          key={typeof option === 'object' ? String(option.value) : option}
          value={typeof option === 'object' ? option.value as any : option}
        >
          {typeof option === 'object' ? option.text : option}
        </Select.Option>
      ))}
    </Select>
  </StyledFormItem >;
};

export const DatePickerField: FieldTypes.TDatePickerField = ({
  style, extraChildProps, extraFieldItemProps, ...props
}) => {
  return <StyledFormItem
    {...props}
    {...extraFieldItemProps}
  >
    <DatePicker style={style} {...extraChildProps} />
  </StyledFormItem>;
};

export const DateRangePickerField: FieldTypes.TDateRangePickerField = ({
  style, extraChildProps, extraFieldItemProps, ...props
}) => {
  return <StyledFormItem
    {...props}
    {...extraFieldItemProps}
  >
    <RangePicker style={style} {...extraChildProps} />
  </StyledFormItem>;
};

export const SubmitCancelButtonField: FieldTypes.TButtonField = ({
  submitTitle = 'Submit',
  cancelTitle = 'Cancel',
  onSubmit,
  onCancel,
  offset = 18,
}) => {
  return <StyledFormItem
    layout={{
      wrapperCol: {
        offset: offset || 0,
      },
    }}
  >
    <Button onClick={onCancel} htmlType="button" className="m-r-sm">
      {cancelTitle}
    </Button>
    <Button onClick={onSubmit} type="primary" htmlType="submit">
      {submitTitle}
    </Button>
  </StyledFormItem>;
};
