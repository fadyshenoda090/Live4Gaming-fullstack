import { useEffect, useRef } from "react";

interface TrailPoint {
    x: number;
    y: number;
    dx: number;
    dy: number;
}

interface Params {
    pointsNumber: number;
    widthFactor: number;
    spring: number;
    friction: number;
}

export default function MouseTrail() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const pointer = { x: 0, y: 0 };

    const params: Params = {
        pointsNumber: 40,
        widthFactor: 0.3,
        spring: 0.4,
        friction: 0.5,
    };

    const trail: TrailPoint[] = Array.from({ length: params.pointsNumber }, () => ({
        x: pointer.x,
        y: pointer.y,
        dx: 0,
        dy: 0,
    }));

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const updateMousePosition = (eX: number, eY: number) => {
            pointer.x = eX;
            pointer.y = eY;
        };

        const handleMouseMove = (e: MouseEvent) => {
            updateMousePosition(e.clientX, e.clientY);
        };

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const update = (): void => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            trail.forEach((p, i) => {
                const prev = i === 0 ? pointer : trail[i - 1];
                const spring = i === 0 ? 0.4 * params.spring : params.spring;
                p.dx += (prev.x - p.x) * spring;
                p.dy += (prev.y - p.y) * spring;
                p.dx *= params.friction;
                p.dy *= params.friction;
                p.x += p.dx;
                p.y += p.dy;
            });

            ctx.lineCap = "round";
            ctx.beginPath();
            ctx.moveTo(trail[0].x, trail[0].y);

            for (let i = 1; i < trail.length - 1; i++) {
                const xc = 0.5 * (trail[i].x + trail[i + 1].x);
                const yc = 0.5 * (trail[i].y + trail[i + 1].y);
                ctx.quadraticCurveTo(trail[i].x, trail[i].y, xc, yc);
                ctx.lineWidth = params.widthFactor * (params.pointsNumber - i);

                // COD Orange/Amber Theme
                const gradient = ctx.createLinearGradient(
                    trail[i].x,
                    trail[i].y,
                    trail[i + 1].x,
                    trail[i + 1].y
                );

                // Orange gradient from light to dark
                gradient.addColorStop(0, "rgba(251, 191, 36, 0.8)");    // amber-300
                gradient.addColorStop(0.5, "rgba(245, 158, 11, 0.6)");  // amber-500
                gradient.addColorStop(1, "rgba(234, 88, 12, 0.4)");     // orange-600

                ctx.strokeStyle = gradient;
                ctx.shadowBlur = 15 + (i * 0.5);
                ctx.shadowColor = "rgba(245, 158, 11, 0.7)"; // amber-500 glow
                ctx.globalAlpha = 0.3 - (i * 0.006); // Fade out towards the end
                ctx.stroke();

                // Reset shadow to avoid affecting next frame
                ctx.shadowBlur = 0;
                ctx.globalAlpha = 1;
            }

            ctx.lineTo(trail[trail.length - 1].x, trail[trail.length - 1].y);
            ctx.stroke();

            requestAnimationFrame(update);
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);
        window.addEventListener("mousemove", handleMouseMove);

        requestAnimationFrame(update);

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [params, trail]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                zIndex: 9999,
                pointerEvents: "none",
            }}
        />
    );
}