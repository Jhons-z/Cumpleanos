import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

declare let confetti: any;

@Component({
  imports: [CommonModule],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})

export class App {
  // Variables de Estado (Data Binding)
  velaApagada = false;
  rosaActiva = false;
  iconoVela = '🕯️';
  textoVela = '¡Pide un deseo y <u>toca aquí</u> para soplar la vela!';

  coloresFiesta = ['#d81b60', '#ff6b6b', '#4facfe', '#ff9f43', '#1dd1a1', '#feca57', '#a55eea'];

  toggleVela() {
    if (!this.velaApagada) {
      this.velaApagada = true;
      this.iconoVela = '🎂✨';
      this.textoVela = '<span class="text-success fw-bold">¡Deseo pedido! Que se cumpla muy pronto 🌠</span> (Toca para encender de nuevo)';
      this.iniciarGranCelebracion();
    } else {
      this.velaApagada = false;
      this.iconoVela = '🕯️';
      this.textoVela = '¡Pide un deseo y <u>toca aquí</u> para soplar la vela!';
      this.iniciarGranCelebracion();
    }
  }

  iniciarGranCelebracion() {
    this.rosaActiva = false;
    this.lanzarCintasPantalla(400);

    if (typeof confetti !== 'function') return;

    // Explosión central
    confetti({
      particleCount: 200, spread: 140, origin: { y: 0.55 },
      colors: this.coloresFiesta, shapes: ['circle', 'square']
    });

    // Lluvia y cañones asíncronos
    const duration = 10000;
    const animationEnd = Date.now() + duration;

    const interval = setInterval(() => {
      if (Date.now() > animationEnd) {
        return clearInterval(interval);
      }
      confetti({ particleCount: 50, angle: 60, spread: 55, origin: { x: 0, y: 0.8 }, colors: this.coloresFiesta });
      confetti({ particleCount: 50, angle: 120, spread: 55, origin: { x: 1, y: 0.8 }, colors: this.coloresFiesta });
      confetti({
        particleCount: 20, angle: 270, spread: 130, origin: { x: Math.random(), y: -0.1 },
        gravity: 0.45, drift: Math.random() > 0.5 ? 0.6 : -0.6, scalar: 1.6, shapes: ['square'], colors: this.coloresFiesta
      });
    }, 220);
  }

  lanzarCintasPantalla(cantidad: number = 350) {
    const contenedor = document.getElementById('contenedorCintas');
    if (!contenedor) return;

    for (let i = 0; i < cantidad; i++) {
      const cinta = document.createElement('div');
      cinta.classList.add('cinta-serpentina');
      cinta.style.left = Math.random() * 100 + 'vw';
      cinta.style.backgroundColor = this.coloresFiesta[Math.floor(Math.random() * this.coloresFiesta.length)];
      cinta.style.width = (Math.random() * 8 + 6) + 'px';
      cinta.style.height = (Math.random() * 35 + 25) + 'px';

      const duracion = Math.random() * 3 + 2.5;
      const retraso = Math.random() * 1.5;
      cinta.style.animationDuration = duracion + 's';
      cinta.style.animationDelay = retraso + 's';

      contenedor.appendChild(cinta);
      setTimeout(() => cinta.remove(), (duracion + retraso) * 1000);
    }
  }

  aceptarSorpresa() {
    this.iniciarGranCelebracion();
    this.rosaActiva = true;
    setTimeout(() => this.mostrarRosaYCorazones(), 400);
  }

  mostrarRosaYCorazones() {
    this.rosaActiva = true;

    // Pequeño delay para permitir que Angular renderice el overlay antes de inyectar corazones
    setTimeout(() => {
      const overlay = document.getElementById('overlayRosa');
      if (!overlay) return;

      const emojisCorazones = ['❤️', '💖', '💘', '💝', '💕', '💗', '💓', '✨'];
      for (let i = 0; i < 50; i++) {
        const corazon = document.createElement('div');
        corazon.classList.add('corazon-flotante');
        corazon.textContent = emojisCorazones[Math.floor(Math.random() * emojisCorazones.length)];

        const angulo = Math.random() * Math.PI * 2;
        const distancia = 90 + Math.random() * 200;
        corazon.style.setProperty('--tx', Math.cos(angulo) * distancia + 'px');
        corazon.style.setProperty('--ty', Math.sin(angulo) * distancia + 'px');
        corazon.style.setProperty('--escala', (Math.random() * 1.3 + 0.8).toFixed(2));
        corazon.style.setProperty('--rot', (Math.random() * 90 - 45) + 'deg');
        corazon.style.fontSize = (Math.random() * 1.8 + 1.4) + 'rem';

        const duracion = Math.random() * 10 + 2.2;
        const retraso = Math.random() * 0.7;
        corazon.style.animationDuration = duracion + 's';
        corazon.style.animationDelay = retraso + 's';

        overlay.appendChild(corazon);
        setTimeout(() => corazon.remove(), (duracion + retraso) * 1000);
      }
    }, 50);
  }

  cerrarRosa() {
    this.rosaActiva = false;
  }
}
