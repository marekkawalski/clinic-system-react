import { PageRequestResponseData } from '../model/PageRequestResponseData.ts';

export class DateHelper<T> {
  convertDateStringsToDates(
    response: PageRequestResponseData<T>,
    dateKeys: string[],
  ): PageRequestResponseData<T> {
    response.content = response.content.map((item: any) => {
      dateKeys.forEach((key: any) => {
        if (item[key] && typeof item[key] === 'string') {
          item[key] = new Date(item[key]);
        }
      });
      return item;
    });
    return response;
  }
}
