// services/api.ts
import {getToken} from './token';
import {StatusCodes} from 'http-status-codes';
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios';
import {AppDispatch, State} from '../types';

type DetailMessageType = {
  type: string;
  message: string;
};

export type ThunkApiConfig = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
};

const BACKEND_URL = 'https://14.design.htmlacademy.pro/six-cities';
const REQUEST_TIMEOUT = 5000;

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.BAD_GATEWAY]: true,
  [StatusCodes.INTERNAL_SERVER_ERROR]: true,
  [StatusCodes.UNAUTHORIZED]: false,
  [StatusCodes.NOT_FOUND]: false,
};

function shouldDisplayError(response: AxiosResponse) {
  const status = response.status;
  return StatusCodeMapping[status] ?? true;
}

export const createAPI = (onError: (message: string) => void): AxiosInstance => {
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
      if (error.response && shouldDisplayError(error.response)) {
        const detailMessage = error.response.data;
        onError(detailMessage.message);
      }

      throw error;
    }
  );

  return api;
};
