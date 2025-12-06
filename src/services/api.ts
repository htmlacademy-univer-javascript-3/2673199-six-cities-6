import {getToken} from './token';
import {StatusCodes} from 'http-status-codes';
import axios, {
  AxiosError,
  AxiosInstance, AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios';
import {AppDispatch, State} from '../types';
import {toast} from 'react-toastify';

type DetailMessageType = {
  type: string;
  message: string;
};

export type ThunkApiConfig = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
};

type RequestOptions<D = unknown> = AxiosRequestConfig<D> & {
  suppressToast?: boolean;
};

const BACKEND_URL = 'https://14.design.htmlacademy.pro/six-cities';
const REQUEST_TIMEOUT = 5000;

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.UNAUTHORIZED]: false,
  [StatusCodes.NOT_FOUND]: false,
};

function shouldDisplayError(response: AxiosResponse) {
  const status = response.status;
  return StatusCodeMapping[status] ?? true;
}

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = getToken();

    if (token && config.headers) {
      config.headers['x-token'] = token;
    }

    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<DetailMessageType>) => {
      const suppressToast = (error.config as RequestOptions)?.suppressToast;
      if (suppressToast) {
        return Promise.reject(error);
      }
      if (error.response && shouldDisplayError(error.response)) {
        toast.error('Возникла ошибка!');
      }
      return Promise.reject(error);
    }
  );

  return api;
};

export async function apiRequestWithToastSettings<T, D>(
  func: (config: AxiosRequestConfig<D>) => Promise<AxiosResponse<T>>,
  options: RequestOptions<D>
): Promise<T> {
  const { suppressToast, ...axiosConfig } = options;
  const configWithMeta = { ...axiosConfig, suppressToast };

  const response = await func(configWithMeta);
  return response.data;
}
