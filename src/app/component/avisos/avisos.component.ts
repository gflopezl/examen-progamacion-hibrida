import { Component, OnInit } from '@angular/core';
import { ListaAvisosComponent } from '../lista-avisos/lista-avisos.component';
import { FormularioAvisoComponent } from '../formulario-aviso/formulario-aviso.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Aviso } from 'src/app/modelo/avisos';
import { AvisosService } from 'src/app/servicio/avisos.service';

@Component({
  selector: 'app-avisos',
  templateUrl: './avisos.component.html',
  styleUrls: ['./avisos.component.scss'],
  standalone: true,
  imports: [ListaAvisosComponent, FormularioAvisoComponent, CommonModule, FormsModule, IonicModule]
})
export class AvisosComponent  implements OnInit {

 
  listaAvisos: Aviso[] = []

  constructor(
    private avisosService: AvisosService
  ) { }

  async ngOnInit() {
    await this.avisosService.iniciarPlugin()
    await this._actualizar()
  }

  async _actualizar() {
    this.listaAvisos = await this.avisosService.mostrarAvisos()
  }

  async onCreateAviso($event: Aviso) {
    const aviso: Aviso = {
      ID: 1, titulo: $event.titulo, foto: $event.foto,
      descripcion: $event.descripcion, fechaAviso: $event.fechaAviso
    }
    await this.avisosService.agregarAviso(aviso)
    await this._actualizar()
  }

}
