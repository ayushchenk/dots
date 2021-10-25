import { Container, Graphics, InteractionEvent, Ticker } from "pixi.js";
import { Point } from "./models/point";
import { Line } from "./models/line";
import SETTINGS from "./settings";

export class Scene extends Container {
    private readonly points: Point[] = [];
    private readonly lines: Line[] = [];
    private readonly background: Graphics = new Graphics();

    constructor(screenWidth: number, screenHeight: number) {
        super();

        this.width = screenWidth;
        this.height = screenHeight;

        this.setupBackground(screenWidth, screenHeight);

        Ticker.shared.add(this.update, this);

        this.addDefaultPoints();
    }

    private setupBackground(width: number, height: number) {
        this.background.beginFill(0xffffff);
        this.background.drawRect(0, 0, width, height);
        this.background.endFill();
        this.background.interactive = true;
        this.background.on("click", this.clickHandler, this);

        this.addChild(this.background);
    }

    private clickHandler(event: InteractionEvent) {
        const pointerEvent = event.data.originalEvent as PointerEvent;

        this.addPoint(pointerEvent.x, pointerEvent.y);
    }

    private update(deltaTime: number) {
        this.points.forEach(point => {
            point.move(deltaTime);
        });

        this.lines.forEach(line => {
            line.move();
        });
    }

    private addDefaultPoints() {
        for (let i = 0; i < SETTINGS.pointsNumber; i++) {
            this.addPoint(Math.random() * window.innerWidth, Math.random() * window.innerHeight);
        }
    }

    private addPoint(x: number, y: number): Point {
        const newPoint = new Point(x, y);

        this.points.push(newPoint);

        this.addChild(newPoint.graphics);

        this.points.filter(p => p != newPoint).forEach(p => {
            this.addLine(newPoint, p);
        });

        return newPoint;
    }

    private addLine(point1: Point, point2: Point): Line {
        const line = new Line(point1, point2);
        point1.lines.push(line);
        point2.lines.push(line);

        this.lines.push(line);

        this.addChild(line.graphics);

        return line;
    }
}