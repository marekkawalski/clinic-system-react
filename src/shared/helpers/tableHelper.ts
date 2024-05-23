import { PageRequestResponseData } from '../model/PageRequestResponseData.ts';

export class TableHelper {
  private _baseColumnTitles: string[] = [];

  get baseColumnTitles(): string[] {
    return this._baseColumnTitles;
  }

  set baseColumnTitles(value: string[]) {
    this._baseColumnTitles = value;
  }

  private _allColumnNames: string[] = [];

  public get allColumnNames(): string[] {
    return this._allColumnNames;
  }

  set allColumnNames(value: string[]) {
    this._allColumnNames = value;
  }

  private _baseColumnNames: string[] = [];

  get baseColumnNames(): string[] {
    return this._baseColumnNames;
  }

  set baseColumnNames(value: string[]) {
    this._baseColumnNames = value;
  }

  nestedPropertyAccessor<T>(item: T, path: string): unknown {
    return path.split('.').reduce((obj, key) => {
      if (obj && typeof obj === 'object' && key in obj) {
        return (obj as { [key: string]: unknown })[key];
      }
      return undefined;
    }, item as unknown);
  }

  setBaseColumnNames(columns: string[]): void {
    this._baseColumnNames = columns;
    this._allColumnNames = columns;
  }

  setAllColumnNames(additionalColumns: string[]): void {
    this._allColumnNames = [...this._baseColumnNames, ...additionalColumns];
  }

  setSpecifiedBaseColumnNamesFromRequestData(
    requestResponseData: PageRequestResponseData<unknown>,
    includeColumns: string[] = [],
    keyColumnMapping: { [key: string]: string } = {},
  ): void {
    if (!requestResponseData?.content) return;

    const keysAndTitles = this.getSpecifiedKeys(
      requestResponseData.content[0] as { [key: string]: unknown },
      includeColumns,
      keyColumnMapping,
    );
    this._baseColumnNames = keysAndTitles.map(item => item.key);
    this._baseColumnTitles = keysAndTitles.map(item => item.title);
    this._allColumnNames = this._baseColumnNames;
  }

  private getSpecifiedKeys(
    obj: { [key: string]: unknown },
    includeList: string[] = [],
    keyColumnMapping: { [key: string]: string } = {},
    parentKey: string = '',
  ): Array<{ key: string; title: string }> {
    return Object.keys(obj).reduce(
      (acc: Array<{ key: string; title: string }>, key: string) => {
        const fullKey = [parentKey, key].filter(Boolean).join('.');

        if (includeList.includes(fullKey)) {
          const columnName = keyColumnMapping[fullKey] || fullKey;
          acc.push({ key: fullKey, title: columnName });
        }

        if (
          typeof obj[key] === 'object' &&
          obj[key] !== null &&
          !(obj[key] instanceof Date) &&
          !Array.isArray(obj[key])
        ) {
          const nestedKeys = this.getSpecifiedKeys(
            obj[key] as { [key: string]: unknown },
            includeList,
            keyColumnMapping,
            fullKey,
          );
          acc = [...acc, ...nestedKeys];
        }
        return acc;
      },
      [],
    );
  }
}
