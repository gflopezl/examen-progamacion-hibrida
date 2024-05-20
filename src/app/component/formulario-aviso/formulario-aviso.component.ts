import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Aviso } from 'src/app/modelo/avisos';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons'
import { cameraOutline } from 'ionicons/icons'
import { Camera, Photo, CameraResultType } from '@capacitor/camera';


@Component({
  selector: 'app-formulario-aviso',
  templateUrl: './formulario-aviso.component.html',
  styleUrls: ['./formulario-aviso.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class FormularioAvisoComponent implements OnInit {

  tituloStr: string = ""
  fotoStr: string = ""
  descripcionStr: string = ""
  picture: string | undefined
  @Output() onCreate = new EventEmitter<Aviso>()

  constructor(private router: Router) { addIcons({ cameraOutline }) }

  ngOnInit() { this.picture = "https://s1.abcstatics.com/abc/www/multimedia/sevilla/2024/04/30/Clipboard-0059-kxzF-U6023028849445fG-1200x840@diario_abc.jpg" }

  onClick() {
    var aviso: Aviso = ({
      ID: 1, titulo: this.tituloStr, foto: this.picture,
      descripcion: this.descripcionStr
    })
    this.onCreate.emit(aviso)
    this.router.navigate(['home'])
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl
    });

    this.picture = image.dataUrl
  }

}
