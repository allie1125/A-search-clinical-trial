import axios from 'axios';
import { IResponse } from 'types/clinicalTrial.d';

interface Params {
  pageNo: number;
  searchText: any;
}

const SERVICE_KEY = 'HDqjNstfdCbTtqxIYVEIlanJjeOBLkalHbPIFPBc1S1ze298Lu0DZhdGWRO1DkMDGOoPLbuSD1oB51OBh5YWcQ==';
const URL = `/B551182/diseaseInfoService/getDissNameCodeList?`;

export const getClinicalTrialSearchApi = async (params: Params) => {
  return axios
    .get<IResponse>(`${URL}`, {
      params: {
        ...params,
        serviceKey: SERVICE_KEY,
      },
    })
    .then((res) => {
      console.log(res.data);
      if (res.data.response.body.totalCount === 0) {
        return { items: { item: [] }, totalCount: 0 };
      }
      if (res.data.response.body.totalCount === 1) {
        return { items: { item: [res.data.response.body.items.item] }, totalCount: 1 };
      }
      return res.data.response.body;
    })
    .catch((error) => console.error(error));
};
