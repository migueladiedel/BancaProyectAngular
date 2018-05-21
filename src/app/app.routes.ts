import { Routes } from '@angular/router';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {HomeComponent} from './home/home.component';
import { BlogListComponent, BlogViewComponent, BlogAddComponent, BlogEditComponent } from './blog/blog.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'inicio', redirectTo: '/' },
  { path: 'blog', children: [
      { path: '', component: BlogListComponent },
      { path: 'add', component: BlogAddComponent},
      { path: ':id/edit', component: BlogEditComponent},
      { path: ':id', component: BlogViewComponent},
      { path: ':id/:kk', component: BlogViewComponent},
    ]
  },

  { path: '404.html', component: PageNotFoundComponent },
  { path: '**', component: PageNotFoundComponent },
];
