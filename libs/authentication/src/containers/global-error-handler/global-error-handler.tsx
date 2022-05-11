import { RootState } from 'apps/mycontentful/src/app/reducers';
import { Toast } from 'primereact/toast';
import * as React from 'react';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authSlice } from '../redux/slice'

interface IToastProps {
}

const GlobalErrorHandler: React.FunctionComponent<IToastProps> = (props) => {
  const toast = useRef<Toast>(null);
  const { toastError, toastSuccess } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch();
  useEffect(() => {
    if (toast.current && toastError) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: toastError, life: 3000 });
      setTimeout(() => { dispatch(authSlice.actions.setToastError('')) }, 3000)
    }
  }, [toastError])

  useEffect(() => {
    if (toast.current && toastSuccess) {
      toast.current.show({ severity: 'success', summary: 'Success', detail: toastSuccess, life: 3000 });
      setTimeout(() => { dispatch(authSlice.actions.setToastSuccess('')) }, 3000)
    }
  }, [toastSuccess])

  return <div>
    <Toast ref={toast} position="bottom-right" />
  </div>;
};

export default GlobalErrorHandler;
