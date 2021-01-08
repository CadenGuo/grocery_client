import React from 'react';
import { FormItemProps, Rule } from 'antd/lib/form';
import { SelectProps } from 'antd/lib/select';
import { InputProps, TextAreaProps } from 'antd/lib/input';
import { InputNumberProps } from 'antd/lib/input-number';
import { CheckboxProps } from 'antd/lib/checkbox';
import { RangePickerProps as DateRangePickerProps, DatePickerProps } from 'antd/lib/date-picker';
import { ColProps } from 'antd/lib/grid';

export interface IStyledFormItemProps extends FormItemProps {
  marginBottom?: any;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  layout?: { wrapperCol?: ColProps, labelCol?: ColProps };
}

export interface IFormFieldProps<CP = { [key: string]: any }> {
  name?: string | string[] | number | number[];
  label?: React.ReactNode;
  rules?: Rule[];
  layout?: { wrapperCol?: ColProps, labelCol?: ColProps };
  required?: boolean;
  style?: { [key: string]: any };
  initialValue?: any;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  extraFieldItemProps?: Omit<IStyledFormItemProps, 'children'>;
  extraChildProps?: CP;
}

export type TFormField<P = { [key: string]: any }> = React.FC<IFormFieldProps<P>>;

export type TButtonField = React.FC<{
  submitTitle?: React.ReactNode;
  cancelTitle?: React.ReactNode;
  onSubmit?: () => any;
  onCancel?: () => any;
  offset?: number | false;
}>;

export type TInputField = TFormField<InputProps>;
export type TTextAreaField = TFormField<TextAreaProps>;
export type TNumberField = TFormField<InputNumberProps>;
export type TCheckboxField = TFormField<CheckboxProps>;
export type TDatePickerField = TFormField<DatePickerProps>;
export type TDateRangePickerField = TFormField<DateRangePickerProps>;
export type TSelectField = React.FC<{
  options: ({ text: string, value: React.ReactText | boolean } | React.ReactText)[];
} & IFormFieldProps<SelectProps<any>>>;

