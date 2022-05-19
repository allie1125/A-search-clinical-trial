export interface IResponse {
  response: ISearchInfo;
}

export interface ISearchInfo {
  header: IHeader;
  body: IBody;
}

export interface IBody {
  items: IItems;
  numOfRows: number;
  pageNo: number;
  totalCount: number;
}

export interface IItems {
  item: IItem[];
}

export interface IItem {
  sickCd: string;
  sickNm: string;
}

interface IHeader {
  resultCode: string;
  resultMsg: string;
}
