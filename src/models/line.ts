import { Graphics } from "@pixi/graphics";
import { Point } from "./point";
import SETTINGS from "../settings";

export class Line {
    public graphics: Graphics;

    constructor(
        public start: Point,
        public end: Point
    ) {
        this.graphics = new Graphics();
        this.move();
    }

    public move() {
        this.graphics.clear();
        this.graphics.lineStyle(this.getLineThickness(), SETTINGS.color, this.getLineAlpha());
        this.graphics.beginFill(SETTINGS.color);
        this.graphics.moveTo(this.start.x, this.start.y);
        this.graphics.lineTo(this.end.x, this.end.y);
        this.graphics.endFill();
    }

    private getLineAlpha() {
        const distance = this.start.distanceTo(this.end);
        return SETTINGS.connectionDistance / distance;
    }

    private getLineThickness(){
        const thickness = this.getLineAlpha() * SETTINGS.lineThicknessMultiplier;
        return thickness > SETTINGS.maxLineThickness ? SETTINGS.maxLineThickness : thickness;
    }
}