import { Component } from '@angular/core';
import { ImportValidationService } from 'shared/services/import-validation/import-validation.service';
import { FieldsConfig } from 'shared/models/admin-import-export.model';
import { ExcelUploadProcessorService } from 'shared/services/excel-upload-processor/excel-upload-processor.service';

@Component({
  selector: 'app-import-providers',
  template: '<div></div>',
  styleUrls: ['./upload-excel.component.scss']
})
export class UploadExcelComponent<
  ImitatorInterface extends { errors: unknown },
  ImitatorInterfaceWithID extends ImitatorInterface & { id: number }
> {
  public extendsComponentConfig: FieldsConfig[];
  public isToggle: boolean;
  public isLoading: boolean = this.excelService.isLoading;

  public isWarningVisible: boolean = false;
  public selectedFile: any = null;
  public isGoTopBtnVisible: boolean;
  public columnNamesBase: string[];
  public standardHeadersBase: string[];
  public readonly topPosToStartShowing: number = 250;

  public dataSource: ImitatorInterfaceWithID[];
  public dataSourceInvalid: ImitatorInterfaceWithID[];

  constructor(
    private readonly importValidationService: ImportValidationService,
    private readonly excelService: ExcelUploadProcessorService
  ) {}

  public setColumnNames(columnNames: string[]): void {
    this.columnNamesBase = columnNames;
  }

  public setStandardHeaders(headers: string[]): void {
    this.standardHeadersBase = headers;
  }

  public resetValues(): void {
    this.dataSource = null;
    this.dataSourceInvalid = null;
    this.isToggle = false;
    this.isWarningVisible = false;
  }

  /**
   * This method process array of providers
   * 1. check array length ,proper length 100
   * 2. define ID key to each provider
   * @param items
   */
  public processProvidersData(items: ImitatorInterface[]): void {
    const isArrayTruncated = this.showsIsTruncated(items);
    const itemsId = items.map((elem, index) => ({ ...elem, id: index })) as ImitatorInterfaceWithID[];
    this.handleData(itemsId, isArrayTruncated);
  }

  /**
   * This method process array of items
   * @param items - items with ID
   * @param isArrayTruncated - indicates whether the array was truncated
   */
  public handleData(items: ImitatorInterfaceWithID[], isArrayTruncated: boolean): void {
    this.importValidationService.checkForInvalidData(items, this.extendsComponentConfig);
    this.dataSource = items;
    this.dataSourceInvalid = this.filterInvalidItems(items);
    this.isLoading = false;
    this.isWarningVisible = isArrayTruncated;
  }

  public onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.selectedFile = target.files[0];
    this.isLoading = true;
    this.resetValues();
    this.excelService.convertExcelToJSON(this.selectedFile, this.standardHeadersBase, this.columnNamesBase).subscribe({
      next: (items) => {
        console.log('Отримані дані:', items);
        this.processProvidersData(items);
      },
      error: (err) => {
        console.error('Помилка при конвертації Excel:', err);
      },
      complete: () => {
        console.log('Обробка завершена');
      }
    });
    target.value = '';
  }

  public filterInvalidItems(items: ImitatorInterfaceWithID[]): ImitatorInterfaceWithID[] {
    return items.filter((elem) => Object.values(elem.errors).find((error) => error !== null));
  }

  public showsIsTruncated(item: any[]): boolean {
    const cutItems = item.splice(100, item.length);
    return Boolean(cutItems.length);
  }

  public sendValidProviders(): void {
    const noErrorsItems = this.dataSource.map(({ errors, ...rest }) => rest);
    console.log(noErrorsItems);
  }
}
