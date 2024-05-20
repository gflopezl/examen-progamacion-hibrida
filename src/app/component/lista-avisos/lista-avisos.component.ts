import { Component, Input, OnInit } from '@angular/core';
import { Aviso } from 'src/app/modelo/avisos';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AvisosService } from 'src/app/servicio/avisos.service';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-lista-avisos',
  templateUrl: './lista-avisos.component.html',
  styleUrls: ['./lista-avisos.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class ListaAvisosComponent implements OnInit {

  @Input() aviso: Aviso[] = [];
  id:number = 0

  constructor(
    private avisosService: AvisosService,
    private modalController: ModalController,

  ) {
  }

  ngOnInit() { }

  async ionViewWillEnter() {
    this.aviso = await this.avisosService.mostrarAvisos()
  }

  async borrarAviso(ID: number) {
    await this.presentDeleteConfirmationModal()
    this.id = ID
    await this.ionViewWillEnter()
  }

  async presentDeleteConfirmationModal() {
    const modal = await this.modalController.create({
      component: ModalComponent,
    });


    modal.onDidDismiss().then((result) => {
      
      if (result.role === 'confirmed') {
        this.avisosService.borrarAviso(this.id)
        console.log("entro a if") 
        location.reload()
      }
    });
    
    return await modal.present();
  }
}