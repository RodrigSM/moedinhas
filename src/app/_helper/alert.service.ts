import { Injectable } from '@angular/core';
import { Info } from '../_models/info';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  /**
   * Construtor do Serviço.
   * @param toastrService Plugin Toastr, para fazer StartUp.
   */
  constructor(private toastrService: ToastrService) {}
  /**
   * Mostra uma Toast.
   * @param info - ResponseBody.Info - Mensagens recebidas pelo WebService
   */
  ShowToast(info: Info) {
    if (info == null) return;
    switch (info.TypeMessage) {
      case 'success':
        this.toastrService.success(info.TextMessage);
        return;
      case 'error':
        this.toastrService.error(info.TextMessage);
        return;
      case 'warning':
        this.toastrService.warning(info.TextMessage);
        return;
      case 'info':
        this.toastrService.info(info.TextMessage);
        return;
      case 'confirm':
        this.toastrService.success(info.TextMessage);
        return;
    }
  }

  ShowError(message: string) {
    this.toastrService.error(message);
  }
  /**
   * Show a Warning Toast
   * @param {string} message Message to be Displayed
   */
  ShowWarning(message: string) {
    this.toastrService.warning(message);
  }
  /**
   * Show a Info Toast
   * @param {string} message Message to be Displayed
   */
  ShowInfo(message: string) {
    this.toastrService.info(message);
  }
  /**
   * Show a Success Toast
   * @param {string} message Message to be Displayed
   */
  ShowSuccess(message: string) {
    this.toastrService.success(message);
  }

  ShowConfirm(message: string) {
    this.toastrService.success(message);
  }

  //   ShowUnsavedSwal(): Promise<boolean> {
  //     return new Promise((resolve, reject) => {
  //       Swal.fire({
  //         title: 'Tem a certeza?',
  //         text: 'Atenção, vai perder as alterações efetuadas. Deseja prosseguir?',
  //         type: 'warning',
  //         showCancelButton: true,
  //         confirmButtonText: 'Sim',
  //         cancelButtonText: 'Não',
  //       }).then((result) => {
  //         if (result.value) resolve(true);
  //         else resolve(false);
  //       });
  //     });
  //   }
}
