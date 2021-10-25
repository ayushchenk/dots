import { Application } from 'pixi.js'
import { Scene } from './scene';

const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0xffffff,
	antialias: true,
	width: window.innerWidth,
	height: window.innerHeight
});

const scene = new Scene(app.screen.width, app.screen.height);

app.stage.addChild(scene);

document.addEventListener("resize", function(event){
	console.log(event);
});