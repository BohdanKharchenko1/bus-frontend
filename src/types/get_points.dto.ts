import {Lang} from "../enums/bookingEnums.ts";


export interface GetPointsRequest {
  login?: string;
  password?: string;
  lang: Lang;
  country_id?: number;
  point_id_to?: number;
  point_id_from?: number;
  autocomplete?: string;
  trans: 'bus';
}
