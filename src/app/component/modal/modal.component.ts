import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class ModalComponent {

  constructor(private modalController: ModalController) { }

  closeModal() {
    this.modalController.dismiss()
  }

  confirmDelete() {
    this.modalController.dismiss(
      "", 'confirmed'
    );
  }
}