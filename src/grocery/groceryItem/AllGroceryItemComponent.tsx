import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  Spin, Button, Divider, Modal,
} from 'antd';
import actionTypes from '../actionTypes';
import generateMapStateToProps from 'common/utils/stateUtils';
import { GroceryItemList, GroceryItemFilter, GroceryItemForm } from '../components';
import { IGroceryItem } from '../types';
import { PageHeader } from 'common/components';
import { isBatchActionsPending } from 'common/utils/actionUtils';
import { useReloadOnActionSucceed, useModal } from 'common/utils/hooks';

type IFilterValue = any; // TODO: this should be exported from ../components/groceryItem

interface IStateProps {
  groceryItemList: any[];
  LIST_GROCERY_ITEM_ACTION: string;
  CREATE_GROCERY_ITEM_ACTION: string;
  UPDATE_GROCERY_ITEM_ACTION: string;
  DELTE_GROCERY_ITEM_ACTION: string;
}
interface IDispatchProps {
  listGroceryItem: (params: IFilterValue) => void;
  deleteGroceryItem: (id: number) => void;
}
interface IOwnProps { }
type Props = IStateProps & IDispatchProps & IOwnProps;

const AllGroceryItemComponent: React.FC<Props> = ({
  listGroceryItem, deleteGroceryItem,
  groceryItemList,
  LIST_GROCERY_ITEM_ACTION, CREATE_GROCERY_ITEM_ACTION, UPDATE_GROCERY_ITEM_ACTION, DELTE_GROCERY_ITEM_ACTION,
}) => {
  useReloadOnActionSucceed(() => listGroceryItem({}), [CREATE_GROCERY_ITEM_ACTION, UPDATE_GROCERY_ITEM_ACTION, DELTE_GROCERY_ITEM_ACTION]);
  const [groceryItem, setGroceryItem] = useState<IGroceryItem>();

  const {
    ModalWrapperComponent: GroceryItemCreateModal,
    toggleVisiblityFunc: toggleGroceryItemCreate,
  } = useModal({
    ContentComponent: GroceryItemForm,
    title: 'Create Grocery Item',
    width: 500,
    passCloseFunctionToProp: 'onCancel',
    contentProps: { isUpdate: false },
  });

  const {
    ModalWrapperComponent: GroceryItemUpdateModal,
    toggleVisiblityFunc: toggleGroceryItemUpdate,
  } = useModal({
    ContentComponent: GroceryItemForm,
    title: 'Update Grocery Item',
    width: 500,
    passCloseFunctionToProp: 'onCancel',
    contentProps: { isUpdate: true, groceryItem },
  });

  const titleExtra = <Button type="primary" onClick={() => toggleGroceryItemCreate(true)}>New Grocery Item</Button>;

  const isLoading = isBatchActionsPending(LIST_GROCERY_ITEM_ACTION, DELTE_GROCERY_ITEM_ACTION);

  return <Spin spinning={isLoading}>
    <PageHeader title={`All Grocery Items(${groceryItemList.length})`} titleExtra={titleExtra} />
    <Divider className="m-t-xs m-b-sm" />
    <GroceryItemFilter onFilter={(values) => listGroceryItem(values)} />
    <GroceryItemList
      groceryItemList={groceryItemList}
      onUpdate={(selectedGroceryItem) => {
        setGroceryItem(selectedGroceryItem);
        toggleGroceryItemUpdate(true);
      }}
      onDelete={(selectedGroceryItem) => Modal.confirm({
        title: 'Confirm to delete this grocery item?',
        onOk: () => deleteGroceryItem(selectedGroceryItem.id),
      })}
    />
    <GroceryItemCreateModal />
    <GroceryItemUpdateModal />
  </Spin>;
};

const mapStateToProps = generateMapStateToProps(
  {
    grocery: ['groceryItemList'],
  },
  {
    grocery: [
      actionTypes.LIST_GROCERY_ITEM,
      actionTypes.CREATE_GROCERY_ITEM,
      actionTypes.UPDATE_GROCERY_ITEM,
      actionTypes.DELTE_GROCERY_ITEM,
    ],
  },
);

const mapDispatchToProps = (dispatch: any) => {
  return {
    listGroceryItem: (params: IFilterValue) => {
      dispatch({
        type: actionTypes.LIST_GROCERY_ITEM.REQUESTED,
        params,
      });
    },
    deleteGroceryItem: (id: number) => {
      dispatch({
        type: actionTypes.DELTE_GROCERY_ITEM.REQUESTED,
        params: {
          id,
        },
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllGroceryItemComponent);
