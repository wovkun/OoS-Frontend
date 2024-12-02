import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import * as XLSX from 'xlsx/xlsx.mjs';

@Injectable({
  providedIn: 'root'
})
export class ExcelUploadProcessorService {
  public isLoading: boolean = false;
  constructor(private readonly translate: TranslateService) {}

  public convertExcelToJSON(file: File, standartHeadersBase: string[], columnNamesBase: string[]): Observable<any[]> {
    return new Observable((observer) => {
      const reader: FileReader = new FileReader();

      reader.onerror = (): void => {
        alert(this.translate.instant('IMPORT/EXPORT.FILE_READER_WARNING'));
        observer.error('Помилка при читанні файлу');
      };

      reader.onload = (e: any): void => {
        try {
          const binaryString = new Uint8Array(e.target.result);
          const workBook: XLSX.WorkBook = XLSX.read(binaryString, { type: 'array', WTF: true, raw: true, cellFormula: false });
          const wsname = workBook.SheetNames[0];
          const currentHeaders = this.getCurrentHeaders(workBook, wsname);
          if (this.checkHeadersIsValid(currentHeaders, standartHeadersBase)) {
            const items = this.getProvidersData(workBook, wsname, columnNamesBase) as unknown as any[];
            observer.next(items);
            observer.complete();
          } else {
            observer.error('Заголовки не відповідають очікуваним');
          }
        } catch (error) {
          alert(this.translate.instant('IMPORT/EXPORT.FILE_READER_WARNING'));
          observer.error(error);
        }
      };
      reader.readAsArrayBuffer(file);
    });
  }

  public getCurrentHeaders(workBook: XLSX.WorkBook, wsname: string): string[] {
    return XLSX.utils.sheet_to_json(workBook.Sheets[wsname], { header: 1 }).shift();
  }

  /**
   * This method get providers from .xlsx file.
   * The "header" option sets the correspondence between the key in the object and the header
   * in the file (header:Director`s name = key:directorsName)the order is strict
   * @returns array of objects,each object is provider`s data
   */
  public getProvidersData(workBook: XLSX.WorkBook, wsname: string, columnNamesBase: string[]): any[] {
    return XLSX.utils.sheet_to_json(workBook.Sheets[wsname], {
      header: columnNamesBase,
      range: 1
    });
  }

  public checkHeadersIsValid(currentHeaders: string[], standartHeadersBase: string[]): boolean {
    const isValid = standartHeadersBase.every((header, index) => currentHeaders[index].trim() === header);
    if (!isValid) {
      this.isLoading = false;
      const invalidHeader = currentHeaders.find((header, index) => header !== standartHeadersBase[index]);
      alert(
        `${this.translate.instant('IMPORT/EXPORT.FILE_HEADERS_WARNING')}"${invalidHeader}",
        \n\n${this.translate.instant('IMPORT/EXPORT.FILE_HEADERS_EXAMPLE')}:\n${standartHeadersBase.join(' | ')}`
      );
    }
    return isValid;
  }
}
