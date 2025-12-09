import React, { useEffect, useRef } from 'react';

const EASTER_EGG_EMOJIS = ['🥑','🍅','🫛','🥕','🫒','🌽','🧅','🥦','🍓','🥭','🍍','🍣','🍤','🍪','🥗','🧀','🥚','🥔'];

export const FoodRain = ({ trigger, quantity = 1 }: { trigger: number; quantity?: number }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<any[]>([]);

    useEffect(() => {
        if (!trigger || trigger === 0) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const newParticles = [];
        for (let i = 0; i < quantity; i++) {
            newParticles.push({
                x: Math.random() * canvas.width,
                y: -50,
                vx: (Math.random() - 0.5) * 5,
                vy: 5 + Math.random() * 5,
                gravity: 0.1,
                emoji: EASTER_EGG_EMOJIS[Math.floor(Math.random() * EASTER_EGG_EMOJIS.length)],
                size: 24 + Math.random() * 16,
                life: 1.0
            });
        }
        particlesRef.current = [...particlesRef.current, ...newParticles];
    }, [trigger, quantity]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        
        const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
        window.addEventListener("resize", resize);
        resize();
        
        let animId: number;
        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particlesRef.current = particlesRef.current.filter(p => p.y < canvas.height + 100);
            particlesRef.current.forEach(p => {
                p.y += p.vy;
                p.x += p.vx;
                ctx.font = `${p.size}px sans-serif`;
                ctx.fillText(p.emoji, p.x, p.y);
            });
            if(particlesRef.current.length > 0) animId = requestAnimationFrame(render);
        };
        render();
        return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(animId); };
    }, [trigger]);

    return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-50" />;
};