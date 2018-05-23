import { Component, OnInit, OnDestroy } from '@angular/core';
import { TarjetasVMService } from './tarjetas-vm.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styleUrls: ['./tarjetas.component.css']
})
export class TarjetasComponent implements OnInit {

  constructor(private vm: TarjetasVMService) { }
  public get VM() { return this.vm; }

  ngOnInit() {
    this.vm.list();
  }
}

@Component({
  selector: 'app-tarjetas-list',
  templateUrl: './tmpl-list.component.html',
  styleUrls: ['./tarjetas.component.css']
})
export class TarjetasListComponent implements OnInit {

  constructor(private vm: TarjetasVMService) { }
  public get VM() { return this.vm; }

  ngOnInit() {
    this.vm.list();
  }

}

@Component({
  selector: 'app-tarjetas-add',
  templateUrl: './tmpl-form.component.html',
  styleUrls: ['./tarjetas.component.css']
})
export class TarjetasAddComponent implements OnInit {

  constructor(private vm: TarjetasVMService) { }
  public get VM() { return this.vm; }

  ngOnInit() {
    this.vm.add();
  }

}

@Component({
  selector: 'app-tarjetas-edit',
  templateUrl: './tmpl-form.component.html',
  styleUrls: ['./tarjetas.component.css']
})
export class TarjetasEditComponent implements OnInit, OnDestroy {
  private obs$: any;

  constructor(private vm: TarjetasVMService, private route: ActivatedRoute, private router: Router) { }
  public get VM() { return this.vm; }

  ngOnInit() {
    this.obs$ = this.route.paramMap.subscribe(
      (params: ParamMap) => {
      const id = +params.get('id'); // (+) converts string 'id' to a number
      if (id) {
        this.vm.edit(id);
      } else {
        this.router.navigate(['/404.html']);
      }
     });
  }
  ngOnDestroy() { this.obs$.unsubscribe(); }

}

@Component({
  selector: 'app-tarjetas-view',
  templateUrl: './tmpl-view.component.html',
  styleUrls: ['./tarjetas.component.css']
})
export class TarjetasViewComponent implements OnInit, OnDestroy {
  private obs$: any;

  constructor(private vm: TarjetasVMService, private route: ActivatedRoute, private router: Router) { }
  public get VM() { return this.vm; }

  ngOnInit() {
    this.obs$ = this.route.paramMap.subscribe(
      params => {
      const id = +params.get('id'); // (+) converts string 'id' to a number
      if (id) {
        this.vm.view(id);
      } else {
        this.router.navigate(['/404.html']);
      }
     });
  }
  ngOnDestroy() { this.obs$.unsubscribe(); }

}

export const TARJETAS_COMPONENT = [TarjetasComponent, TarjetasListComponent, TarjetasAddComponent,
  TarjetasEditComponent, TarjetasViewComponent, ];
