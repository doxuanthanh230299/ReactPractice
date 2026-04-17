import axiosClient from './axiosClient';
import type { CustomerI } from '../types';

export const customerApi = {
  getList(): Promise<{ data: CustomerI[] }> {
    return axiosClient.get('/customers');
  },

  getDetail(id: number): Promise<CustomerI> {
    return axiosClient.get(`/customers/${id}`);
  },

  create(data: CustomerI) {
    return axiosClient.post('/customers', data);
  },

  update(id: number, data: CustomerI) {
    return axiosClient.put(`/customers/${id}`, data);
  },

  delete(id: number) {
    return axiosClient.delete(`/customers/${id}`);
  }
};