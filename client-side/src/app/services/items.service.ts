import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ItemModel } from '../models/item.model';
import { map, timeout, finalize } from 'rxjs/operators';
import { UiService } from './ui.service';
import ResponsePayload from '../models/response-payload';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  private URLS = {
    GET_ALL_ITEMS: 'items',
  };
  private headers: HttpHeaders;
  private baseUrl: string;

  constructor(private http: HttpClient, private uiService: UiService) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    this.baseUrl = environment.apiURL;
  }

  private buildApiURL(path = ''): string {
    return this.baseUrl + path;
  }

  getAllItems(): Observable<Array<ItemModel>> {
    this.uiService.showLoading();

    return this.http
      .get(this.buildApiURL(this.URLS.GET_ALL_ITEMS), { headers: this.headers })
      .pipe(
        timeout(30000),
        map((response: ResponsePayload<Array<ItemModel>>) => response.data),
        finalize(() => this.uiService.hideLoading())
      );
  }

  getItemById(id: number): Observable<ItemModel> {
    this.uiService.showLoading();

    return this.http
      .get(this.buildApiURL(`${this.URLS.GET_ALL_ITEMS}/${id}`), {
        headers: this.headers,
      })
      .pipe(
        timeout(30000),
        map((response: ResponsePayload<ItemModel>) => response.data),
        finalize(() => this.uiService.hideLoading())
      );
  }

  createNewItem(data: ItemModel): Observable<ItemModel> {
    this.uiService.showLoading();

    return this.http
      .post(
        this.buildApiURL(`${this.URLS.GET_ALL_ITEMS}`),
        { ...data },
        {
          headers: this.headers,
        }
      )
      .pipe(
        timeout(30000),
        map((response: ResponsePayload<ItemModel>) => response.data),
        finalize(() => this.uiService.hideLoading())
      );
  }

  updateItemById(id: number, data: ItemModel): Observable<ItemModel> {
    this.uiService.showLoading();

    return this.http
      .put(
        this.buildApiURL(`${this.URLS.GET_ALL_ITEMS}/${id}`),
        { ...data },
        {
          headers: this.headers,
        }
      )
      .pipe(
        timeout(30000),
        map((response: ResponsePayload<ItemModel>) => response.data),
        finalize(() => this.uiService.hideLoading())
      );
  }

  deleteItemById(id: number): Observable<ItemModel> {
    this.uiService.showLoading();

    return this.http
      .delete(this.buildApiURL(`${this.URLS.GET_ALL_ITEMS}/${id}`), {
        headers: this.headers,
      })
      .pipe(
        timeout(30000),
        map((response: ResponsePayload<ItemModel>) => response.data),
        finalize(() => this.uiService.hideLoading())
      );
  }
}
