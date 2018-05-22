import { Injectable } from '@angular/core';
import { LoggerService } from '../../banca-core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { NotifyService } from '../services/notify.service';

@Injectable({providedIn: 'root'})
export class TarjetasDAOService {
  private baseUrl = environment.WSUrl + 'tarjetas';
  private options = { withCredentials: true };

  constructor(private http: HttpClient) { }
  query(): Observable<any> {
    return this.http.get(this.baseUrl, this.options);
  }
  find(idCliente: string): Observable<any> {
    return this.http.get(this.baseUrl + '?idCliente=' + idCliente, this.options);
  }
  get(id: number) {
    return this.http.get(this.baseUrl + '/' + id, this.options);
  }
  add(item: any)  {
    return this.http.post(this.baseUrl, item, this.options);
  }
  change(item: any) {
    return this.http.put(this.baseUrl, item, this.options);
  }
  remove(id: number) {
    return this.http.delete(this.baseUrl + '/' + id, this.options);
  }
}

@Injectable({providedIn: 'root'})
export class TarjetasVMService {
  private modo: 'list' | 'add' | 'edit' | 'view' | 'delete' = 'list';
  private listado: Array<any> = [];
  private elemento: any = {};
  private idOriginal = null;
  protected pk = 'id';
  protected urllist = '/tarjetas';

  constructor(private dao: TarjetasDAOService, private nsrv: NotifyService,
    private out: LoggerService, private router: Router) { }

  public get Modo() { return this.modo; }
  public get Listado() { return this.listado; }
  public get Elemento() { return this.elemento; }

  public findByElement(key: any) {
    this.dao.find(key).subscribe(
      data => {
        this.listado = data;
        this.modo = 'list';
      },
      error => { this.nsrv.add(error.message); }
    );
  }

  public list() {
    this.dao.query().subscribe(
      data => {
        this.listado = data;
        this.modo = 'list';
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
        },
      error => { this.nsrv.add(error.message); }
    );
  }

  public view(key: any) {
    this.dao.get(key).subscribe(
      data => {
        this.modo = 'view';
        this.elemento = data;
        },
      error => { this.nsrv.add(error.message); }
    );
  }

  public remove(key: any) {
    if (!window.confirm('¿Seguro?')) { return; }
    this.dao.remove(key).subscribe(
      data => { this.list(); },
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
          data => { this.cancel(); },
          error => { this.nsrv.add(error.message); }
        );
        break;
      case 'edit':
        this.dao.change(this.elemento).subscribe(
          data => { this.cancel(); },
          error => { this.nsrv.add(error.message); }
        );
        break;
      case 'view':
        this.cancel();
        break;
    }
  }

}
