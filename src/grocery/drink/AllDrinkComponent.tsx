import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Spin, Button, Divider, Modal,
} from 'antd';
import actionTypes from '../actionTypes';
import generateMapStateToProps from 'common/utils/stateUtils';
import { DrinkList, DrinkFilter, DrinkForm } from '../components';
import { IDrink } from '../types';
import { PageHeader } from 'common/components';
import { isBatchActionsPending } from 'common/utils/actionUtils';
import { useReloadOnActionSucceed, useModal } from 'common/utils/hooks';

type IFilterValue = any; // TODO: this should be exported from ../components/drink

interface IStateProps {
  drinkList: any[];
  LIST_DRINK_ACTION: string;
  CREATE_DRINK_ACTION: string;
  UPDATE_DRINK_ACTION: string;
  DELTE_DRINK_ACTION: string;
}
interface IDispatchProps {
  listDrink: (params: IFilterValue) => void;
  deleteDrink: (id: number) => void;
}
interface IOwnProps { }
type Props = IStateProps & IDispatchProps & IOwnProps;

const AllDrinkComponent: React.FC<Props> = ({
  listDrink, deleteDrink,
  drinkList,
  LIST_DRINK_ACTION, CREATE_DRINK_ACTION, UPDATE_DRINK_ACTION, DELTE_DRINK_ACTION,
}) => {
  useReloadOnActionSucceed(() => listDrink({}), [CREATE_DRINK_ACTION, UPDATE_DRINK_ACTION, DELTE_DRINK_ACTION]);
  const [drink, setDrink] = useState<IDrink>();

  const {
    ModalWrapperComponent: DrinkCreateModal,
    toggleVisiblityFunc: toggleDrinkCreate,
  } = useModal({
    ContentComponent: DrinkForm,
    title: 'Create Drink',
    width: 500,
    passCloseFunctionToProp: 'onCancel',
    contentProps: { isUpdate: false },
  });

  const {
    ModalWrapperComponent: DrinkUpdateModal,
    toggleVisiblityFunc: toggleDrinkUpdate,
  } = useModal({
    ContentComponent: DrinkForm,
    title: 'Update Drink',
    width: 500,
    passCloseFunctionToProp: 'onCancel',
    contentProps: { isUpdate: true, drink },
  });

  const titleExtra = <Button type="primary" onClick={() => toggleDrinkCreate(true)}>New Drink</Button>;

  const isLoading = isBatchActionsPending(LIST_DRINK_ACTION, DELTE_DRINK_ACTION);

  return <Spin spinning={isLoading}>
    <PageHeader title={`All Drinks(${drinkList.length})`} titleExtra={titleExtra} />
    <Divider className="m-t-xs m-b-sm" />
    <DrinkFilter onFilter={(values) => listDrink(values)} />
    <DrinkList
      drinkList={drinkList}
      onUpdate={(selectedDrink) => {
        setDrink(selectedDrink);
        toggleDrinkUpdate(true);
      }}
      onDelete={(selectedDrink) => Modal.confirm({
        title: 'Confirm to delete this drink?',
        onOk: () => deleteDrink(selectedDrink.id),
      })}
    />
    <DrinkCreateModal />
    <DrinkUpdateModal />
  </Spin>;
};

const mapStateToProps = generateMapStateToProps(
  {
    grocery: ['drinkList'],
  },
  {
    grocery: [
      actionTypes.LIST_DRINK,
      actionTypes.CREATE_DRINK,
      actionTypes.UPDATE_DRINK,
      actionTypes.DELTE_DRINK,
    ],
  },
);

const mapDispatchToProps = (dispatch: any) => {
  return {
    listDrink: (params: IFilterValue) => {
      dispatch({
        type: actionTypes.LIST_DRINK.REQUESTED,
        params,
      });
    },
    deleteDrink: (id: number) => {
      dispatch({
        type: actionTypes.DELTE_DRINK.REQUESTED,
        params: {
          id,
        },
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllDrinkComponent);
