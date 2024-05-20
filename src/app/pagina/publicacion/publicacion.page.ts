import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { addOutline } from 'ionicons/icons'
import { RouterModule } from '@angular/router';
import { Aviso } from 'src/app/modelo/avisos';
import { AvisosComponent } from 'src/app/component/avisos/avisos.component';
import { AvisosService } from 'src/app/servicio/avisos.service';

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.page.html',
  styleUrls: ['./publicacion.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, AvisosComponent, RouterModule]
})
export class PublicacionPage implements OnInit {
  avisos: Aviso[] = []
  constructor(private avisosService: AvisosService) { addIcons({ addOutline }) }

  async ngOnInit() {
    this.avisos = await this.avisosService.mostrarAvisos()
  }
}

