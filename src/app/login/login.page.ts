import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { first } from 'rxjs';
import { LoginApiService } from './login.service';
import { AlertService } from '../_helper/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username: string = '';
  password: string = '';
  public submitted: boolean = false;
  public loading: boolean = false;
  alertButtons = ['Action'];

  loginForm: FormGroup;

  constructor(
    private apiService: LoginApiService,
    private router: Router,
    private _formBuilder: FormBuilder,
    //private cookieService: CookieService,
    private alertService: AlertService,
    private alertController: AlertController
  ) {}

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      username: [this.apiService.Username, Validators.required],
      password: [this.apiService.Password, Validators.required],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  login() {
    this.submitted = true;
    // Se o Form estiver invalido, para aqui.
    if (this.loginForm.invalid) {
      console.log('sera');
      return;
    }
    //Pedido a ser realizado

    this.loading = true;
    console.log(22);
    //Executa o Pedido de login. O pedido é realizador pelo Authentication Service.
    this.apiService
      .login(this.f['username'].value, this.f['password'].value)
      .pipe(first())
      .subscribe(
        (data) => {
          //Pedido terminou.
          this.loading = false;
          //Trabalha o resultado.
          console.log(data.Code);
          if (data.Code == 1) {
            console.log();
            if (this.apiService.loggedUser.PrimeiroAcesso == true) {
              this.alertService.ShowToast(data.Info);
              console.log(data.Info);
              //this.changePassword();
            } else {
              console.log(data.Info);
              this.router.navigate(['']);
              this.apiService.loggedUser = data.Data;
              // //this.alertService.ShowToast(data.Info);
              // this.cookieService.set(
              //   'Username',
              //   this.f['username'].value,
              //   new Date(2999, 12),
              //   '/'
              // );
              // this.cookieService.set(
              //   'Password',
              //   this.f['password'].value,
              //   new Date(2999, 12),
              //   '/'
              // );
              // console.log(this.f['checked'].value);
              // if (this.f['checked'].value) {
              //   this.cookieService.set(
              //     'Lembrarme',
              //     'true',
              //     new Date(2999, 12),
              //     '/'
              //   );
              //   this.cookieService.set(
              //     'Username',
              //     this.f['username'].value,
              //     new Date(2999, 12),
              //     '/'
              //   );
              //   this.cookieService.set(
              //     'Password',
              //     this.f['password'].value,
              //     new Date(2999, 12),
              //     '/'
              //   );
              // } else {
              //   this.cookieService.set(
              //     'Lembrarme',
              //     'false',
              //     new Date(2999, 12),
              //     '/'
              //   );

              //   this.cookieService.set('Username', '', new Date(2999, 12), '/');
              //   this.cookieService.set('Password', '', new Date(2999, 12), '/');
              // }
            }
          } else {
            this.presentAlert();
          }
        },
        (error) => {
          //Pedido terminou
          this.loading = false;
        }
      );
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Erro no Login',
      //subHeader: 'A Sub Header Is Optional',
      message: 'O nome do utilizador ou password erradas',
      buttons: ['Ok'],
    });

    await alert.present();
  }

  // login() {
  //   // Call the login API endpoint with username and password
  //   this.apiService.login(this.username, this.password).subscribe(
  //     (response) => {
  //       // Handle successful login
  //       console.log('Login successful:', response);
  //       // Redirect to another page (e.g., home page)
  //       this.router.navigate(['/home']);
  //     },
  //     (error) => {
  //       // Handle login error
  //       console.error('Login error:', error);
  //       // Optionally, display an error message to the user
  //     }
  //   );
  // }
}
