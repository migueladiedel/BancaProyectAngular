import { Component, OnInit } from '@angular/core';
import { BlogVMService } from './blog-vm.service';
import { BaseListComponent, BaseAddComponent, BaseEditComponent, BaseViewComponent } from '../base-class/vm-component';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  constructor(private vm: BlogVMService) { }
  public get VM() { return this.vm; }

  ngOnInit() {
    this.vm.list();
  }
}

@Component({
  selector: 'app-blog-list',
  templateUrl: './tmpl-list.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogListComponent extends BaseListComponent<BlogVMService> {
  constructor(vm: BlogVMService) { super(vm); }
}

@Component({
  selector: 'app-blog-add',
  templateUrl: './tmpl-form.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogAddComponent extends BaseAddComponent<BlogVMService> {
  constructor(vm: BlogVMService) { super(vm); }
}

@Component({
  selector: 'app-blog-edit',
  templateUrl: './tmpl-form.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogEditComponent extends BaseEditComponent<BlogVMService> {
  constructor(vm: BlogVMService, route: ActivatedRoute, router: Router) {
    super(vm, route, router);
  }
}

@Component({
  selector: 'app-blog-view',
  templateUrl: './tmpl-view.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogViewComponent extends BaseViewComponent<BlogVMService> {
  constructor(vm: BlogVMService, route: ActivatedRoute, router: Router, private title: Title) {
    super(vm, route, router);
  }
  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    super.ngOnInit();
    const t = this.VM.Response.subscribe(
      data => {
        this.title.setTitle(this.VM.Elemento.titulo);
        t.unsubscribe();
      }
    );
  }
}

export const BLOG_COMPONENT = [BlogComponent, BlogListComponent, BlogAddComponent,
  BlogEditComponent, BlogViewComponent, ];
