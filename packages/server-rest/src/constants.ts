// api : https status
const API_RESPONSE_BAD_REQUEST: string = 'Bad Request';
const API_RESPONSE_CREATED: string = 'The record has been successfully created';
const API_RESPONSE_INTERNAL_SERVER_ERROR: string = 'Internal server error';
const API_RESPONSE_UNAUTHORIZED: string = 'Unauthorized';
// api : shared
const API_RESPONSE_FOUND_RECORD: string = 'The found record';
const API_RESPONSE_FOUND_RECORDS: string = 'The found records';
// api: model personale
const API_OPERATION_GET_PERSONALE: string = 'Get Personale';
const API_OPERATION_GET_ALL_PERSONALE: string = 'Get all Personale';
const API_OPERATION_REGISTER_PERSONALE: string = 'Register Personale';
// api: model cartellaclinica
const API_OPERATION_GET_CARTELLACLINICA: string = 'Get Cartellaclinica';
const API_OPERATION_GETBYUSERNAME_CARTELLACLINICA: string = 'GetbyUsername Cartellaclinica';
const API_OPERATION_CREATE_CARTELLACLINICA: string = 'Create Cartellaclinica';
const API_OPERATION_DEGENZA_CARTELLACLINICA: string = 'ChangeDegenza Cartellaclinica';
const API_OPERATION_CAMBIACONSENSO_CARTELLACLINICA: string = 'ChangeConsenso Cartellaclinica';
// api: auth
const API_OPERATION_AUTH_LOGIN: string = 'Login user';
const API_OPERATION_GET_PROFILE: string = 'Get user profile';
const API_RESPONSE_LOGIN: string = 'JWT Token';
const API_RESPONSE_GET_PROFILE: string = 'User profile';

export const appConstants = {
  API_RESPONSE_BAD_REQUEST,
  API_RESPONSE_CREATED,
  API_RESPONSE_INTERNAL_SERVER_ERROR,
  API_RESPONSE_UNAUTHORIZED,
  API_RESPONSE_FOUND_RECORD,
  API_RESPONSE_FOUND_RECORDS,
  API_OPERATION_GET_PERSONALE,
  API_OPERATION_GET_ALL_PERSONALE,
  API_OPERATION_REGISTER_PERSONALE,
  API_OPERATION_GET_CARTELLACLINICA,
  API_OPERATION_GETBYUSERNAME_CARTELLACLINICA,
  API_OPERATION_CREATE_CARTELLACLINICA,
  API_OPERATION_DEGENZA_CARTELLACLINICA,
  API_OPERATION_CAMBIACONSENSO_CARTELLACLINICA,
  API_OPERATION_AUTH_LOGIN,
  API_OPERATION_GET_PROFILE,
  API_RESPONSE_LOGIN,
  API_RESPONSE_GET_PROFILE,
};