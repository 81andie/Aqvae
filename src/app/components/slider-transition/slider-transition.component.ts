import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider-transition',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slider-transition.component.html',
  styleUrl: './slider-transition.component.css'
})
export class SliderTransitionComponent implements OnInit, OnDestroy{
[x: string]: any;

  ngOnInit(): void {
    this.indices = Array.from({ length: this.images.length }, (_, i) => i);
    this.intervalId = setInterval(() => this.nextImage(), 1500);
  }
  ngOnDestroy(): void {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  images=[
  "assets/images/autumm.webp",
  "assets/images/drought-2791710_1280.webp",
  "assets/images/fascinante-paisaje-pinos-hermoso-lago_181624-25197.webp",
  "assets/images/mountain-2651233_1280.webp",
  "assets/images/nina.webp",



  ]

  indices: number[] = [];

  currentIndex = 0;
  intervalId: any;

  setCurrentIndex(index:number):void{
    this.currentIndex=index;
  }





  nextImage() {
    if ('startViewTransition' in document) {
      (document as any).startViewTransition(() => {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
      });
    } else {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }
  }

}

