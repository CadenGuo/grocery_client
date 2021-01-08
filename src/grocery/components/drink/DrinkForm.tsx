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
import { IDrink } from 'grocery/types';

interface IOwnProps {
  isUpdate?: boolean;
  drink?: IDrink;
  onCancel?: () => any;
}
interface IStateProps {
  CREATE_DRINK_ACTION: string;
  UPDATE_DRINK_ACTION: string;
}
interface IDispatchProps {
  createDrink: (payload: any) => void;
  updateDrink: (payload: any) => void;
}
type Props = IOwnProps & IStateProps & IDispatchProps;
const DrinkForm: React.FC<Props> = ({
  isUpdate, drink,
  onCancel = () => null,
  UPDATE_DRINK_ACTION, CREATE_DRINK_ACTION,
  createDrink, updateDrink,
}) => {
  useReloadOnActionSucceed(() => {
    onCancel();
  }, [UPDATE_DRINK_ACTION, CREATE_DRINK_ACTION], false);

  function onFinish(values: any) {
    const payload = values;
    if (isUpdate && drink) {
      payload.id = drink.id;
      updateDrink(payload);
    } else {
      createDrink(payload);
    }
  }

  const trueFalseOptions = [{
    text: 'Yes',
    value: true,
  }, {
    text: 'No',
    value: false,
  }];

  const isLoading = isBatchActionsPending(UPDATE_DRINK_ACTION, CREATE_DRINK_ACTION);

  return <Spin spinning={isLoading}>
    <Form onFinish={onFinish}>
      <InputField label="Name" name="name" initialValue={drink?.name} required />
      <NumberField label="Amount" name="amount" initialValue={drink?.amount} required />
      <InputField label="Unit" name="unit" initialValue={drink?.unit} required />
      <SelectorField label="Carbonated" name="carbonated" options={trueFalseOptions} initialValue={drink?.carbonated} />
      <SelectorField label="Alcoholic" name="alcoholic" options={trueFalseOptions} initialValue={drink?.alcoholic} />
      <DatePickerField label="Expiration" name="expiration" initialValue={drink?.expiration ? moment(drink?.expiration) : undefined} />
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
      actionTypes.CREATE_DRINK,
      actionTypes.UPDATE_DRINK,
    ],
  },
);

const mapDispatchToProps = (dispatch: any) => {
  return {
    createDrink: (payload: any) => {
      dispatch({
        type: actionTypes.CREATE_DRINK.REQUESTED,
        params: {
          ...payload,
        },
      });
    },
    updateDrink: (payload: any) => {
      dispatch({
        type: actionTypes.UPDATE_DRINK.REQUESTED,
        params: {
          ...payload,
        },
      });
    },
  };
};

export default connect<IStateProps, IDispatchProps>
  (mapStateToProps, mapDispatchToProps)(DrinkForm);
