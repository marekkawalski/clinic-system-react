import { PageRequestResponseData } from '../model/PageRequestResponseData.ts';

export class DateHelper<T> {
  convertDateStringsToDates(
    response: PageRequestResponseData<T>,
    dateKeys: (keyof T)[],
  ): PageRequestResponseData<T> {
    if (!response?.content) return response;

    const convertedContent = response.content.map(item =>
      this.convertItemDates(item, dateKeys),
    );

    return { ...response, content: convertedContent };
  }

  private convertItemDates(item: T, dateKeys: (keyof T)[]): T {
    const newItem = { ...item };

    dateKeys.forEach(key => {
      const dateValue = newItem[key];
      if (typeof dateValue === 'string') {
        newItem[key] = new Date(dateValue) as unknown as T[keyof T];
      }
    });

    return newItem;
  }
}
