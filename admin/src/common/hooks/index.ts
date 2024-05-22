import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '~/app/store';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export { default as useDebounce } from './useDebounce';
export { default as useMount } from './useMount';
export { default as useQuery } from './useQuery';
export { default as useUpdateEffect } from './useUpdateEffect';
