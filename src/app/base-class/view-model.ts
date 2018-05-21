import { NotifyService } from '../services/notify.service';
import { LoggerService } from '../../banca-core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../environments/environment';

export interface IDAOService<T> {
  query(): Observable<T>;
  get(id: number | string): Observable<T>;
  add(item: T): Observable<T>;
  change(item: T): Observable<T>;
  remove(id: number | string): Observable<T>;
}
export interface IVMService {
  list(): void;
  add(): void;
  edit(key: any): void;
  view(key: any): void;
  remove(key: any): void;
  cancel(): void;
  send(): void;
}

export class DAOService<T> implements IDAOService<T> {
  protected baseUrl: string;

  constructor(protected http: HttpClient, baseUrl: string, protected options = {}) {
    this.baseUrl = environment.WSUrl + baseUrl;
  }
  query(): Observable<T> {
    return this.http.get<T>(this.baseUrl, this.options);
  }
  get(id: number): Observable<T> {
    return this.http.get<T>(this.baseUrl + '/' + id, this.options);
  }
  add(item: any): Observable<T>  {
    return this.http.post<T>(this.baseUrl, item, this.options);
  }
  change(item: any): Observable<T> {
    return this.http.put<T>(this.baseUrl, item, this.options);
  }
  remove(id: number): Observable<T> {
    return this.http.delete<T>(this.baseUrl + '/' + id, this.options);
  }
}
export class VMDAOServiceBase<T extends IDAOService<any>> implements IVMService {
  protected modo: 'list' | 'add' | 'edit' | 'view' | 'delete' = 'list';
  protected listado: Array<any> = [];
  protected elemento: any = {};
  protected idOriginal = null;
  protected response = new Subject();

  constructor(protected dao: T, protected nsrv: NotifyService, protected out: LoggerService,
    private router: Router, protected urllist: string, protected pk = 'id') { }

  public get Modo() { return this.modo; }
  public get Listado() { return this.listado; }
  public get Elemento() { return this.elemento; }
  public get Response() { return this.response; }

  public list() {
    this.dao.query().subscribe(
      data => {
        this.listado = data;
        this.modo = 'list';
        this.response.next(data);
      },
      error => { this.nsrv.add(error.message); }
    );
  }

  public add() {
    this.modo = 'add';
    this.elemento = { id: 0 };
  }

  public edit(key: any) {
    this.dao.get(key).subscribe(
      data => {
        this.modo = 'edit';
        this.elemento = data;
        this.idOriginal = key;
        this.response.next(this.elemento);
        },
      error => { this.nsrv.add(error.message); }
    );
  }

  public view(key: any) {
    this.dao.get(key).subscribe(
      data => {
        this.modo = 'view';
        this.elemento = data;
        this.response.next(this.elemento);
        },
      error => { this.nsrv.add(error.message); }
    );
  }

  public remove(key: any) {
    if (!window.confirm('¿Seguro?')) { return; }
    this.dao.remove(key).subscribe(
      data => {
        this.cancel();
        this.response.next(data);
      },
      error => { this.nsrv.add(error.message); }
    );
  }

  public cancel() {
    this.elemento = {};
    this.idOriginal = null;
    // this.list();
    this.router.navigateByUrl(this.urllist);
  }

  public send() {
    switch (this.modo) {
      case 'add':
        this.dao.add(this.elemento).subscribe(
          data => {
            this.cancel();
            this.response.next(data);
          },
          error => { this.nsrv.add(error.message); }
        );
        break;
      case 'edit':
        this.dao.change(this.elemento).subscribe(
          data => {
            this.cancel();
            this.response.next(data);
          },
           error => { this.nsrv.add(error.message); }
        );
        break;
      case 'view':
        this.cancel();
        break;
    }
  }
}

export class VMServiceBase implements IVMService {
  protected modo: 'list' | 'add' | 'edit' | 'view' | 'delete' = 'list';
  protected listado: Array<any> = [];
  protected elemento: any = {};
  protected idOriginal = null;

  constructor(protected nsrv: NotifyService, protected out: LoggerService, protected pk = 'id') { }

  public get Modo() { return this.modo; }
  public get Listado() { return this.listado; }
  public get Elemento() { return this.elemento; }

  public list() {
    this.modo = 'list';
  }

  public add() {
    this.modo = 'add';
    this.elemento = {};
  }

  public edit(key: any) {
    // tslint:disable-next-line:triple-equals
    const rslt = this.listado.find(item => item[this.pk] == key);
    if (rslt) {
      this.modo = 'edit';
      this.elemento = Object.assign({}, rslt);
      this.idOriginal = key;
    } else {
      this.nsrv.add('Elemento no encontrado.');
    }
  }

  public view(key: any) {
    // tslint:disable-next-line:triple-equals
    const rslt = this.listado.find(item => item[this.pk] == key);
    if (rslt) {
      this.modo = 'view';
      this.elemento = Object.assign({}, rslt);
    } else {
      this.nsrv.add('Elemento no encontrado.');
    }
  }

  public remove(key: any) {
    if (!window.confirm('¿Seguro?')) { return; }
    // tslint:disable-next-line:triple-equals
    const indice = this.listado.findIndex(item => item[this.pk] == key);
    if (indice !== -1) {
      this.listado.splice(indice, 1);
      this.list();
    } else {
      this.nsrv.add('Elemento no encontrado.');
    }
  }

  public cancel() {
    this.elemento = {};
    this.idOriginal = null;
    this.list();
  }

  public send() {
    switch (this.modo) {
      case 'add':
        this.listado.push(this.elemento);
        this.cancel();
        break;
      case 'edit':
          // tslint:disable-next-line:triple-equals
          const indice = this.listado.findIndex(item => item[this.pk] == this.idOriginal);
          if (indice !== -1) {
            this.listado[indice] = this.elemento;
            this.list();
          } else {
            this.nsrv.add('Elemento no encontrado.');
          }
          break;
      case 'view':
          this.cancel();
          break;
    }
  }
}
