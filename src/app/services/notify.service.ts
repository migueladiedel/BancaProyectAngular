import { Injectable } from '@angular/core';
import { LoggerService } from '../../banca-core/services/logger.service';
import { Subject } from 'rxjs';

type TipoError = 'error' | 'warn' | 'log';

export class Notify {
  Mensaje: string;
  Tipo: TipoError = 'error';
  constructor(msg: string, tipo: TipoError  = 'error') {
    this.Mensaje = msg;
    this.Tipo = tipo;
  }
}

@Injectable({
  providedIn: 'root'
})
export class NotifyService {
  private listado: Array<Notify> = [];
  private notificacion = new Subject<string>();

  constructor(private con: LoggerService) { }

  public get Listado() { return this.listado; }
  public get Notificacion() { return this.notificacion; }

  public add(msg: string, tipo: TipoError = 'error'): void {
    this.listado.push({Mensaje: msg, Tipo: tipo});
    this.notificacion.next(msg);
    if (tipo === 'error') {
      this.con.error(msg);
    }
  }
  public remove(index: number): void {
    if (0 <= index && index < this.listado.length) {
      this.listado.splice(index, 1);
    } else {
      this.con.error('Indice fuera de rango');
    }
  }
  public clear() {
    this.listado.splice(0, this.listado.length);
  }
}
