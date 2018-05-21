import { Injectable } from '@angular/core';
import { NotifyService } from '../services/notify.service';
import { LoggerService } from '../../banca-core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VMServiceBase, DAOService, VMDAOServiceBase } from '../base-class/view-model';

@Injectable({
  providedIn: 'root'
})
export class BlogDAOService extends DAOService<any> {
  constructor(http: HttpClient) {
    super(http, 'blog', { withCredentials: true });
  }
}

@Injectable({
  providedIn: 'root'
})
export class BlogVMService extends VMDAOServiceBase<BlogDAOService> {
  constructor(dao: BlogDAOService, nsrv: NotifyService, out: LoggerService, router: Router) {
    super(dao, nsrv, out, router, '/blog', 'id');
  }
}

@Injectable({
  providedIn: 'root'
})
export class BlogVMServiceOld extends VMServiceBase {
  constructor(nsrv: NotifyService, out: LoggerService) {
    super(nsrv, out, 'id');
  }
  public list() {
    this.modo = 'list';
    if (this.listado.length === 0 ) {
      this.listado = [
        {
            'id': 1,
            'titulo': 'Saludo',
            // tslint:disable-next-line:max-line-length
            'texto': 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores eveniet eum nisi expedita ab dolorum labore similique provident officia ipsa, aliquam recusandae dicta id, praesentium quasi consequatur minus laborum perferendis?',
            'autor': 'Javier',
            'fecha': '2016-02-29',
            'megusta': 0,
            'fotourl': 'https://angular.io/assets/images/logos/angular/logo-nav@2x.png'
        },
        {
            'id': 2,
            'titulo': 'Angular 4.3 Now Available',
            // tslint:disable-next-line:max-line-length
            'texto': '<p>Angular version 4.3 has been released. This is a minor release following our announced adoption of Semantic Versioning, meaning that it contains no breaking changes and that it is a drop-in replacement for 4.x.x.</p><h2>What’s new?</h2><ul><li>We are introducing HttpClient, a smaller, easier to use, and more powerful library for making HTTP Requests. Learn more about it from our docs.</li><li>New router life cycle events for Guards and Resolvers. Four new events: GuardsCheckStart, GuardsCheckEnd, ResolveStart, ResolveEnd join the existing set of life cycle event such as NavigationStart.</li><li>Conditionally disable animations via a new attribute, [@.disabled]</li><li>Support for the emulated /deep/ CSS Selector (the Shadow-Piercing descendant combinator aka >>>) has been deprecated to match browser implementations and Chrome’s intent to remove. ::ng-deep has been added to provide a temporary workaround for developers currently using this feature.</li></ul>',
            'autor': 'Stephen Fluin',
            'fecha': '2017-07-18',
            'megusta': 0,
            'fotourl': 'https://angular.io/assets/images/logos/angular/logo-nav@2x.png'
        }
    ];
    }
  }

}
