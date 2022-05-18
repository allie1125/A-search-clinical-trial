import axios from 'axios';
import { ISearchInfo } from 'types/clinicalTrial.d';

interface Params {
  pageNo: number;
  searchText: any;
}

const SERVICE_KEY = 'HDqjNstfdCbTtqxIYVEIlanJjeOBLkalHbPIFPBc1S1ze298Lu0DZhdGWRO1DkMDGOoPLbuSD1oB51OBh5YWcQ==';
const URL = `/B551182/diseaseInfoService/getDissNameCodeList?`;

export const getClinicalTrialSearchApi = async (params: Params) => {
  return axios
    .get<ISearchInfo>(`${URL}`, {
      params: {
        ...params,
        serviceKey: SERVICE_KEY,
      },
    })
    .then((res) => {
      console.log(res.data);
      return res.data;
    });

  //   .then((res: any) => {
  //     console.log(res.data);
  //     const { data } = res.data.response.body.items;
  //     return data;
  //   })
  //   .catch((e) => e);
  // return fetchData;
};
