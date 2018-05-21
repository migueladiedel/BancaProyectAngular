import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { IVMService } from './view-model';

export class BaseListComponent<T extends IVMService> implements OnInit {
  constructor(protected vm: T) { }
  public get VM() {
    return this.vm;
  }
  ngOnInit() {
    this.vm.list();
  }

}

export class BaseAddComponent<T extends IVMService> implements OnInit {

  constructor(protected vm: T) { }
  public get VM() { return this.vm; }

  ngOnInit() {
    this.vm.add();
  }

}

export class BaseEditComponent<T extends IVMService> implements OnInit, OnDestroy {
  private obs$: any;

  constructor(protected vm: T, protected route: ActivatedRoute, protected router: Router) { }
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

export class BaseViewComponent<T extends IVMService> implements OnInit, OnDestroy {
  private obs$: any;

  constructor(protected vm: T, protected route: ActivatedRoute, protected router: Router) { }
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
