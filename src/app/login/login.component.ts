import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/seguridad.service';
import { NotifyService } from '../services/notify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  txtButon = 'Log In';
  txtUsuario = 'admin';
  txtPassword = 'P@$$w0rd';

  constructor(public loginSrv: LoginService, private nsrv: NotifyService, private router: Router) { }

  ngOnInit() {
    this.cambiaTexto();
  }

  logInOut() {
    if (this.loginSrv.isAutenticated) {
      this.loginSrv.logout();
      this.cambiaTexto();
    } else {
      this.loginSrv.login(this.txtUsuario, this.txtPassword).subscribe(
        data => {
          if (data) {
            this.cambiaTexto();
            this.router.navigateByUrl('tarjetas');
          } else {
            this.nsrv.add('Usuario o contraseña inválida.');
            this.router.navigateByUrl('ofertas');
          }
        },
        err => { this.nsrv.add(err.message); }
      );
    }
  }

  registrar() {
    this.router.navigateByUrl('/registro');
  }

  private cambiaTexto() {
    this.txtButon = this.loginSrv.isAutenticated ? 'Log Out' : 'Log In';
  }
}
