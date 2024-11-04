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

  ngOnInit(): void {
    this.intervalId = setInterval(() => this.nextImage(), 3000);
  }
  ngOnDestroy(): void {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  images=[
  "assets/images/drought-2791710_1280.jpg",
  "assets/images/mountain-2651233_1280.jpg",
  "assets/images/nature-8093509_1280.webp",
  "assets/images/autumn-947235_1280.jpg",
  "assets/images/fascinante-paisaje-pinos-hermoso-lago_181624-25197.jpg",
 


  ]

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

