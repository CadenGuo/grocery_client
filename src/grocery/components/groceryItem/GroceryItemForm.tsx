import React from 'react';
import { connect } from 'react-redux';
import {
  Form, Spin,
} from 'antd';
import moment from 'moment';
import {
  InputField, DatePickerField, NumberField, SelectorField, SubmitCancelButtonField,
} from 'common/form';
import actionTypes from 'grocery/actionTypes';
import generateMapStateToProps from 'common/utils/stateUtils';
import { isBatchActionsPending } from 'common/utils/actionUtils';
import { useReloadOnActionSucceed } from 'common/utils/hooks';
import { IGroceryItem } from 'grocery/types';
import { GROCERY_ITEM_TYPE } from 'common/constants';

interface IOwnProps {
  isUpdate?: boolean;
  groceryItem?: IGroceryItem;
  onCancel?: () => any;
}
interface IStateProps {
  CREATE_GROCERY_ITEM_ACTION: string;
  UPDATE_GROCERY_ITEM_ACTION: string;
}
interface IDispatchProps {
  createGroceryItem: (payload: any) => void;
  updateGroceryItem: (payload: any) => void;
}
type Props = IOwnProps & IStateProps & IDispatchProps;
const GroceryItemForm: React.FC<Props> = ({
  isUpdate, groceryItem,
  onCancel = () => null,
  UPDATE_GROCERY_ITEM_ACTION, CREATE_GROCERY_ITEM_ACTION,
  createGroceryItem, updateGroceryItem,
}) => {
  useReloadOnActionSucceed(() => {
    onCancel();
  }, [UPDATE_GROCERY_ITEM_ACTION, CREATE_GROCERY_ITEM_ACTION], false);

  function onFinish(values: any) {
    const payload = values;
    if (isUpdate && groceryItem) {
      payload.id = groceryItem.id;
      updateGroceryItem(payload);
    } else {
      createGroceryItem(payload);
    }
  }

  const isLoading = isBatchActionsPending(UPDATE_GROCERY_ITEM_ACTION, CREATE_GROCERY_ITEM_ACTION);

  return <Spin spinning={isLoading}>
    <Form onFinish={onFinish}>
      <InputField label="Name" name="name" initialValue={groceryItem?.name} required />
      <NumberField label="Amount" name="amount" initialValue={groceryItem?.amount} required />
      <InputField label="Unit" name="unit" initialValue={groceryItem?.unit} required />
      <SelectorField label="Type" name="type" options={Object.values(GROCERY_ITEM_TYPE)} initialValue={groceryItem?.type} required />
      <DatePickerField label="Expiration" name="expiration" initialValue={groceryItem?.expiration ? moment(groceryItem?.expiration) : undefined} />
      <SubmitCancelButtonField
        offset={12}
        onCancel={onCancel}
      />
    </Form>
  </Spin>;
};

const mapStateToProps = generateMapStateToProps(
  {},
  {
    grocery: [
      actionTypes.CREATE_GROCERY_ITEM,
      actionTypes.UPDATE_GROCERY_ITEM,
    ],
  },
);

const mapDispatchToProps = (dispatch: any) => {
  return {
    createGroceryItem: (payload: any) => {
      dispatch({
        type: actionTypes.CREATE_GROCERY_ITEM.REQUESTED,
        params: {
          ...payload,
        },
      });
    },
    updateGroceryItem: (payload: any) => {
      dispatch({
        type: actionTypes.UPDATE_GROCERY_ITEM.REQUESTED,
        params: {
          ...payload,
        },
      });
    },
  };
};

export default connect<IStateProps, IDispatchProps>
  (mapStateToProps, mapDispatchToProps)(GroceryItemForm);
