import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router'; // Importa el Router para redirección


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  @ViewChild('cameraPreview', { static: false }) cameraPreview!: ElementRef<HTMLVideoElement>;
  private stream!: MediaStream;
  private isFrontCamera: boolean = true;

  constructor(private router: Router) {}

  async ionViewDidEnter() {
    await this.startCamera();
  }

  async startCamera() {
    const constraints = {
      video: {
        facingMode: this.isFrontCamera ? 'user' : 'environment',
      },
    };

    try {
      this.stream = await navigator.mediaDevices.getUserMedia(constraints);
      this.cameraPreview.nativeElement.srcObject = this.stream;
    } catch (err) {
      console.error('Error accessing camera:', err);
    }
  }

  toggleCamera() {
    this.isFrontCamera = !this.isFrontCamera;
    this.stopCamera();
    this.startCamera();
  }

  capturePhoto() {
    const video = this.cameraPreview.nativeElement;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext('2d');
    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL('image/png');
      this.router.navigate(['/tab3', { image: imageData }]);
    }
  }

  cancel() {
    this.stopCamera();
    this.router.navigate(['/tab1']);
  }

  stopCamera() {
    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
    }
  }

  ionViewWillLeave() {
    this.stopCamera();
  }

}
