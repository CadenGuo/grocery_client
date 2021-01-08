import React, { useEffect, useRef, useState, useMemo, ReactNode } from 'react';
import { Modal } from 'antd';
import { ModalProps } from 'antd/lib/modal';
import { isActionSuccess } from './actionUtils';

/**
 * This a react hook holding the value during last render of the variable passed in through `value` param.
 * @param value `T` The variable whose previous value to be held.
 * @param initialValue `T` The initial value of the variable whose previous value to be held.
 * @returns `T` Previsou value of variable passed through `value` param.
 */
function usePrevious<T>(value: T, initialValue: T) {
  const ref = useRef(initialValue);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

/**
 * This is the hook used to run some reloading functions (.eg fetching data from backend)
 * when a action status changed to SUCCEEDED.
 *
 * @param reloadFunc {Callable} The reload function to run.
 * @param reloadDependentActionStatus `string[]` List of action status to monitor.
 * @param loadOnStart `boolean` If true, the reload function will run on first running of this hook. Default true.
 */
const useReloadOnActionSucceed = (
  reloadFunc: CallableFunction,
  reloadDependentActionStatus: string[],
  loadOnStart = true,
) => {
  const isFirstRender = useRef(true);
  const prevDependencies = usePrevious(reloadDependentActionStatus, []);
  const singleActionSucceeded = reloadDependentActionStatus.reduce(
    (acc, actionStatus, index) => {
      return acc || (isActionSuccess(actionStatus) && actionStatus !== prevDependencies[index]);
    },
    false,
  );

  useEffect(() => {
    if (loadOnStart && isFirstRender.current) {
      reloadFunc();
    } else if (!isFirstRender.current) {
      if (singleActionSucceeded) {
        reloadFunc();
      }
    }
    isFirstRender.current = false;
  }, [reloadDependentActionStatus]);
};

interface IUseModal<T> {
  ContentComponent?: React.ComponentType<T>;
  title?: string;
  width?: number;
  modelProps?: ModalProps;
  passCloseFunctionToProp?: string;
  /**
   * By right this should be the type representing the props needed directly by
   * the component(excluding the props injected to the component by HOCs, e.g. redux: connect).
   * But the type define is not fully supporting this. Current we make all the props of the component
   * optional so that we still get auto-complete when writing this param and the prevention from
   * adding props not belonging to the component.
   */
  contentProps?: Partial<T>;
}
/**
 * This is a react hook returning a modal component and the handler to control the visibility of the modal.
 * @param ContentComponent `ReactComponent` The content component to be rendered in the modal. Can be `undefined`, that case you may manually render component inside returned `ModalWrapperComponent`.
 * @param title `ReactNode` Modal title.
 * @param contentProps `object` Props to be passed to `ContentComponent`.
 * @param width `number` Modal width.
 * @param modelProps `number` antd Modal props. This overides `title` and `width`.
 * @param passCloseFunctionToProp `string` If set, the `ContentComponent` will have a prop named after this param with the value of the function to close the modal.
 */
function useModal<T>({
  ContentComponent,
  title,
  contentProps = {} as T,
  width = 800,
  modelProps = {},
  passCloseFunctionToProp,
}: IUseModal<T>) {
  const [visible, setVisible] = useState(false);
  const ModalWrapperComponentFactory = () => ({ children }: { children?: ReactNode }) => {
    const toggleFuncProps = passCloseFunctionToProp ? {
      [passCloseFunctionToProp]: () => setVisible(false),
    } : {};
    return <Modal
      title={title}
      width={width}
      footer={null}
      onCancel={() => setVisible(false)}
      visible={visible}
      destroyOnClose
      {...modelProps}
    >
      {ContentComponent && <ContentComponent
        {...toggleFuncProps}
        {...contentProps as any}
      />}
      {children}
    </Modal>;
  };

  const ModalWrapperComponent = useMemo(ModalWrapperComponentFactory, [visible]);

  return {
    ModalWrapperComponent,
    toggleVisiblityFunc: setVisible,
  };
}

export {
  useModal,
  usePrevious,
  useReloadOnActionSucceed,
};
