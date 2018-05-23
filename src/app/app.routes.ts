import { Routes } from '@angular/router';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {HomeComponent} from './home/home.component';
import { BlogListComponent, BlogViewComponent, BlogAddComponent, BlogEditComponent } from './blog/blog.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { TarjetasComponent, TarjetasListComponent, TarjetasViewComponent, TarjetasEditComponent, TarjetasAddComponent } from './tarjetas/tarjetas.component';
import { OfertasComponent } from './ofertas/ofertas.component';

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
  { path: 'tarjetas', children: [
    { path: '', component: TarjetasListComponent },
    { path: 'add', component: TarjetasAddComponent},
    { path: ':id/edit', component: TarjetasEditComponent},
    { path: ':id', component: TarjetasViewComponent},
    { path: ':id/:kk', component: TarjetasViewComponent},
  ]
},
  { path: 'ofertas', component: OfertasComponent },
  { path: 'registro', component: RegisterUserComponent },
  { path: '404.html', component: PageNotFoundComponent },
  { path: '**', component: PageNotFoundComponent },
];
