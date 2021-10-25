import { Graphics } from "@pixi/graphics";
import SETTINGS, { PointBehavior } from "../settings";
import { Line } from "./line";

export class Point {
    public radius: number;
    public graphics: Graphics;
    public xVel: number;
    public yVel: number;
    public lines: Line[] = [];

    constructor(
        x: number,
        y: number,
    ) {
        this.graphics = new Graphics();
        this.graphics.x = x;
        this.graphics.y = y;

        this.radius = Math.random() * SETTINGS.radiusMultiplier + SETTINGS.baseRadius;

        this.graphics.beginFill(SETTINGS.color);
        this.graphics.drawCircle(0, 0, this.radius);
        this.graphics.endFill();

        this.xVel = Math.random() * SETTINGS.baseVelocity - SETTINGS.baseVelocity / 2;
        this.yVel = Math.random() * SETTINGS.baseVelocity - SETTINGS.baseVelocity / 2;
    }

    public get x() {
        return this.graphics.x;
    }

    public get y() {
        return this.graphics.y;
    }

    public move(delta: number) {
        this.graphics.x += this.xVel * delta;
        this.graphics.y += this.yVel * delta;

        switch(SETTINGS.pointBehavior){
            case PointBehavior.Bounce: return this.bounce();
            case PointBehavior.Teleport: return this.teleport();
        }
    }

    public distanceTo(point: Point): number {
        return Math.sqrt(Math.pow(this.graphics.x - point.graphics.x, 2) + Math.pow(this.graphics.y - point.graphics.y, 2));
    }

    private bounce(){
        if (this.graphics.x < 0 || this.graphics.x > window.innerWidth) {
            this.xVel = -this.xVel;
        }

        if (this.graphics.y < 0 || this.graphics.y > window.innerHeight) {
            this.yVel = -this.yVel;
        }

        this.checkIfOutside();
    }

    private checkIfOutside(){
        if (this.graphics.x < 0) {
            this.graphics.x = 0;
        }

        if (this.graphics.x > window.innerWidth) {
            this.graphics.x = window.innerWidth;
        }

        if (this.graphics.y < 0) {
            this.graphics.y = 0;
        }

        if (this.graphics.y > window.innerHeight) {
            this.graphics.y = window.innerHeight;
        }
    }

    private teleport(){
        if (this.graphics.x < 0) {
            this.graphics.x = window.innerWidth;
        }

        if (this.graphics.x > window.innerWidth) {
            this.graphics.x = 0;
        }

        if (this.graphics.y < 0) {
            this.graphics.y = window.innerHeight;
        }

        if (this.graphics.y > window.innerHeight) {
            this.graphics.y = 0;
        }
    }
}