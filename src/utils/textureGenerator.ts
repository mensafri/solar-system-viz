import { CanvasTexture } from 'three';

const createCanvas = (width = 512, height = 256) => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  return canvas;
};

export const createGasGiantTexture = (color: string, bands: number = 5) => {
  const canvas = createCanvas();
  const ctx = canvas.getContext('2d')!;
  const width = canvas.width;
  const height = canvas.height;

  // Base color
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, width, height);

  // Bands
  for (let i = 0; i < bands; i++) {
    const y = Math.random() * height;
    const h = Math.random() * (height / bands);
    ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.3})`;
    ctx.fillRect(0, y, width, h);
    
    // Darker bands
    const y2 = Math.random() * height;
    const h2 = Math.random() * (height / bands);
    ctx.fillStyle = `rgba(0, 0, 0, ${Math.random() * 0.2})`;
    ctx.fillRect(0, y2, width, h2);
  }
  
  // Storms (ovals)
  for (let i = 0; i < 3; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const rx = 20 + Math.random() * 40;
      const ry = 10 + Math.random() * 20;
      
      ctx.beginPath();
      ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, 0.1)`;
      ctx.fill();
  }

  return new CanvasTexture(canvas);
};

export const createRockyTexture = (color: string) => {
  const canvas = createCanvas();
  const ctx = canvas.getContext('2d')!;
  const width = canvas.width;
  const height = canvas.height;

  ctx.fillStyle = color;
  ctx.fillRect(0, 0, width, height);

  // Noise/Craters
  for (let i = 0; i < 200; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const r = Math.random() * 5;
    
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0, 0, 0, ${Math.random() * 0.3})`;
    ctx.fill();
  }

  // Large craters
  for (let i = 0; i < 10; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const r = 10 + Math.random() * 20;
    
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0, 0, 0, 0.1)`;
    ctx.fill();
    
    // Crater rim
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(255, 255, 255, 0.1)`;
    ctx.stroke();
  }

  return new CanvasTexture(canvas);
};

export const createIceGiantTexture = (color: string) => {
    const canvas = createCanvas();
    const ctx = canvas.getContext('2d')!;
    const width = canvas.width;
    const height = canvas.height;
  
    // Gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, color);
    gradient.addColorStop(0.5, '#ffffff'); // Lighter middle
    gradient.addColorStop(1, color);
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    
    // Subtle clouds
    for (let i = 0; i < 20; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const w = 50 + Math.random() * 100;
        const h = 5 + Math.random() * 10;
        
        ctx.fillStyle = `rgba(255, 255, 255, 0.1)`;
        ctx.fillRect(x, y, w, h);
    }
  
    return new CanvasTexture(canvas);
  };

export const createSunTexture = () => {
    const canvas = createCanvas(512, 512);
    const ctx = canvas.getContext('2d')!;
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.fillStyle = '#FDB813';
    ctx.fillRect(0, 0, width, height);
    
    // Granules
    for(let i=0; i<1000; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const r = 2 + Math.random() * 3;
        
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 140, 0, ${Math.random() * 0.5})`;
        ctx.fill();
    }
    
    return new CanvasTexture(canvas);
}
