import { PageRequestParams } from '../model/PageRequestParams.ts';

export class HttpParamsHelper {
  setupHttpParams(params?: PageRequestParams): URLSearchParams {
    const searchParams = new URLSearchParams();
    if (params) {
      (Object.keys(params) as (keyof PageRequestParams)[]).forEach(key => {
        const value = params[key];
        if (value !== undefined && value !== null) {
          searchParams.append(key, value.toString());
        }
      });
    }
    return searchParams;
  }
}
