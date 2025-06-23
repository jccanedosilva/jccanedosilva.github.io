import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, Input, ViewChild, NgZone } from '@angular/core';

@Component({
  selector: 'app-stack-components',
  imports: [CommonModule],
  templateUrl: './stack-components.component.html',
  styleUrl: './stack-components.component.scss'
})
export class StackComponentsComponent {

  images: string[] = [
    
    "images/android.png",
    "images/kotlin.png",
    "images/java.png",
    "images/ionic.png",
    "images/ts.png",
    "images/angular.png",
    "images/html.png",
    "images/css.png"


  ];
 
  @Input() scrollSpeed: number = 1; // Pixeles a mover por frame (más alto = más rápido)
  @Input() autoScroll: boolean = true; // Activar/desactivar el desplazamiento automático

  @ViewChild('carouselContainer') carouselContainer!: ElementRef;
  @ViewChild('carouselWrapper') carouselWrapper!: ElementRef;

  translateX: number = 0; // La posición actual del carrusel para el CSS transform
  totalImagesWidth: number = 0; // Ancho total del contenido (incluyendo duplicados)
  containerWidth: number = 0; // Ancho del contenedor visible (el 'viewport')

  private animationFrameId: number | null = null; // ID para requestAnimationFrame
  private singleSetImagesWidth: number = 0; // Almacena el ancho de un solo conjunto de imágenes

  constructor(private ngZone: NgZone) {}

  ngOnInit(): void {
    console.log('ImageCarouselComponent ngOnInit - autoScroll:', this.autoScroll);
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit called.');

    // Usamos setTimeout para asegurar que las referencias del DOM y las imágenes están cargadas
    const checkElements = () => {
      if (this.carouselContainer && this.carouselWrapper && this.carouselWrapper.nativeElement) {
        console.log('ngAfterViewInit: carouselContainer and carouselWrapper.nativeElement are defined.');
        this.ngZone.run(() => {
          this.calculateDimensions(); // Primera medición

          // Asegúrate de que las imágenes se carguen para obtener el scrollWidth correcto
          const imageElements = Array.from(this.carouselWrapper.nativeElement.querySelectorAll('.carousel-image')) as HTMLImageElement[];
          let loadedImagesCount = 0;
          const totalImages = imageElements.length;

          if (totalImages === 0) {
            console.warn('No images found in carousel.');
            if (this.autoScroll) {
              this.startInfiniteScroll();
            }
            return;
          }

          imageElements.forEach((img) => {
            if (img.complete) {
              loadedImagesCount++;
            } else {
              img.onload = () => {
                loadedImagesCount++;
                console.log(`Image loaded: ${img.src}. Loaded count: ${loadedImagesCount}/${totalImages}`);
                if (loadedImagesCount === totalImages) {
                  console.log('All images loaded. Recalculating dimensions...');
                  this.calculateDimensions();
                  if (this.autoScroll) {
                    this.startInfiniteScroll();
                  }
                }
              };
              img.onerror = () => {
                console.error(`Failed to load image: ${img.src}`);
                loadedImagesCount++;
                if (loadedImagesCount === totalImages) {
                  console.log('All images (some possibly failed) loaded. Recalculating dimensions...');
                  this.calculateDimensions();
                  if (this.autoScroll) {
                    this.startInfiniteScroll();
                  }
                }
              };
            }
          });

          if (loadedImagesCount === totalImages) {
            console.log('All images already loaded (from cache). Recalculating dimensions...');
            this.calculateDimensions();
            if (this.autoScroll) {
              this.startInfiniteScroll();
            }
          }
        });
      } else {
        console.log('ngAfterViewInit: carouselContainer or carouselWrapper.nativeElement is still undefined. Retrying...');
        setTimeout(checkElements, 50);
      }
    };
    this.ngZone.runOutsideAngular(() => {
      setTimeout(checkElements, 0);
    });
  }

  ngOnDestroy(): void {
    this.stopInfiniteScroll();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    console.log('Window resized. Recalculating dimensions.');
    this.stopInfiniteScroll(); // Detener antes de recalcular
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        this.ngZone.run(() => {
          this.calculateDimensions();
          if (this.autoScroll && this.singleSetImagesWidth > 0) { // Solo iniciar si hay imágenes para desplazar
            this.startInfiniteScroll();
          }
        });
      }, 0);
    });
  }

  private calculateDimensions(): void {
    if (!this.carouselContainer || !this.carouselWrapper || !this.carouselWrapper.nativeElement) {
      console.warn('calculateDimensions called when container or wrapper.nativeElement is null/undefined. Skipping.');
      return;
    }

    const imageElements = Array.from(this.carouselWrapper.nativeElement.querySelectorAll('.carousel-image')) as HTMLImageElement[];
    if (imageElements.length === 0) {
        this.singleSetImagesWidth = 0;
        this.stopInfiniteScroll(); // Detener si no hay imágenes
        return;
    }

    this.containerWidth = this.carouselContainer.nativeElement.offsetWidth;
    this.totalImagesWidth = this.carouselWrapper.nativeElement.scrollWidth;

    // Calcular el ancho de un solo conjunto de imágenes
    // Suma los anchos de las primeras 'this.images.length' imágenes, incluyendo sus márgenes.
    this.singleSetImagesWidth = 0;
    for (let i = 0; i < this.images.length; i++) {
        const img = imageElements[i];
        if (img) { // Asegurarse de que el elemento existe
            this.singleSetImagesWidth += img.offsetWidth;
            const style = getComputedStyle(img);
            this.singleSetImagesWidth += parseInt(style.marginRight || '0', 10);
            this.singleSetImagesWidth += parseInt(style.marginLeft || '0', 10); // Incluir margen izquierdo si aplica
        }
    }
    // Si la última imagen no tiene margin-right, ajusta aquí si es necesario
    // Por ejemplo, si tu CSS .carousel-image:last-child { margin-right: 0; }
    // Deberías restar el margin-right de la última imagen del set si se incluyó.

    console.log('--- calculateDimensions ---');
    console.log('Container Width:', this.containerWidth);
    console.log('Total Wrapper Scroll Width (includes duplicates):', this.totalImagesWidth);
    console.log('Calculated Single Set Images Width:', this.singleSetImagesWidth);

    // Asegurarse de que el carrusel solo se mueva si el contenido excede el contenedor
    if (this.totalImagesWidth <= this.containerWidth) {
        this.stopInfiniteScroll();
        this.translateX = 0; // Resetear posición si no hay scroll
        console.log('Content fits in container. Stopping scroll.');
    } else {
        if (this.autoScroll && !this.animationFrameId) {
            this.startInfiniteScroll(); // Iniciar si debe moverse y no está activo
        }
    }
    // Asegurarse de que translateX no sea inválido al redimensionar
    if (this.translateX < -this.totalImagesWidth + this.containerWidth) {
        this.translateX = -this.totalImagesWidth + this.containerWidth;
    }
    if (this.translateX > 0) {
        this.translateX = 0;
    }
  }


  private startInfiniteScroll(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId); // Detener cualquier animación previa
    }
    console.log('Attempting to start infinite scroll animation...');

    if (this.singleSetImagesWidth === 0 || this.totalImagesWidth <= this.containerWidth) {
        console.log('Cannot start infinite scroll: singleSetImagesWidth is 0 or content fits.');
        return;
    }

    const animate = () => {
      this.ngZone.run(() => { // Asegura que Angular detecta los cambios en translateX
        this.translateX -= this.scrollSpeed;

        // La magia del loop infinito:
        // Cuando el translateX ha movido el ancho de UN conjunto de imágenes,
        // reiniciamos instantáneamente (sin transición) la posición.
        // Esto crea la ilusión de un bucle continuo porque el siguiente conjunto es idéntico.
        if (this.translateX <= -this.singleSetImagesWidth) {
          this.translateX += this.singleSetImagesWidth; // Resetea la posición.
                                                        // Sumamos el ancho del set para volver al punto inicial
                                                        // del siguiente set de imágenes.
          // console.log(`Infinite loop reset: translateX reset to ${this.translateX}`);
        }
      });
      this.animationFrameId = requestAnimationFrame(animate); // Solicita el siguiente frame
    };

    this.animationFrameId = requestAnimationFrame(animate); // Inicia el primer frame
    console.log('Infinite scroll animation started.');
  }

  private stopInfiniteScroll(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
      console.log('Infinite scroll animation stopped.');
    }
  }
}
