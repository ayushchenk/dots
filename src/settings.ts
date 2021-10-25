export enum PointBehavior {
    Bounce, Teleport
}

const SETTINGS = {
    color: 0xbbbbbb,
    maxLineThickness: 4,
    lineThicknessMultiplier: 10,
    connectionDistance: 50,
    radiusMultiplier: 5,
    baseRadius: 5,
    baseVelocity: 1.5,
    pointsNumber: 30,
    pointBehavior: PointBehavior.Bounce
};

export default SETTINGS;