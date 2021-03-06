import * as THREE from 'three';
import * as TILE from './Tile'

import { GameScene } from './GameScene';
import { Sprite } from './Sprite';
import { getTexture } from './texture';

let timer;
let startButton = document.querySelector("#start")

let camera = new THREE.OrthographicCamera(window.innerWidth / -2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / -2, -1, 2);
let renderer = new THREE.WebGLRenderer({ alpha: true });
let mouse = new THREE.Vector2(0, 0);

let scene = new GameScene(camera, renderer, mouse, () => {
	clearInterval(timer);

	scene.getMap().unlock();

	scene.getRobot().reset();
	scene.getStack().flush();

	startButton.classList.add('btn-start');
	startButton.classList.remove('btn-stop');
	startButton.innerHTML = "<i class='fas fa-play'></i>";
}, () => {
	clearInterval(timer);

	alert("You stay alive !");

	startButton.classList.add('btn-start');
	startButton.classList.remove('btn-stop');
	startButton.innerHTML = "<i class='fas fa-play'></i>";
}, () => {
	startButton.disabled = true;

	alert("You stayed alive all along the game ! I'll give you a cake next time !");
});

window.addEventListener('mousemove', (event) => {
	mouse.x = Math.round(event.clientX - window.innerWidth / 2);
	mouse.y = Math.round(-event.clientY + window.innerHeight / 2);
}, false);

window.addEventListener('mousedown', (event) => {
	let hovered = scene.getMap().getHovered(mouse);

	if(!scene.getMap().isLocked() && hovered !== null && hovered.tile.isEditable())
		scene.getMap().setTile(hovered.x, hovered.y, new TILE.Slot());
});

startButton.addEventListener('click', (event) => {
	if (!scene.isRunning()) {
		scene.runSimulation();
		scene.getMap().lock();

		timer = setInterval(() => {
			scene.switchTick();
			let hovered = scene.getMap().getHovered(scene.getRobot().position);

			if (!hovered)
			{
				scene.triggerAbort();
				return;
			}

			if (scene.getTick()) // once over two from first
			{
				hovered.tile.onRobotLeave(scene);
				scene.getRobot().update();
				hovered = scene.getMap().getHovered(scene.getRobot().position);
				if (hovered)
					hovered.tile.onRobotEnter(scene);
			}
			else // once over two from second
				hovered.tile.onRobotHover(scene);

			if(!scene.getRobot().isAlive())
				scene.triggerAbort();
		}, 1000 / 4);

		startButton.classList.add('btn-stop');
		startButton.classList.remove('btn-start');
		startButton.innerHTML = "<i class='fas fa-stop'></i>";
	}
	else if (scene.isRunning()) {
		scene.triggerAbort(false);
	}
});

// Render
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let animate = function () {
	requestAnimationFrame(animate);

	scene.update(mouse);

	renderer.render(scene, camera);
};

animate();