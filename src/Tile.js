import * as THREE from 'three'
import * as TEX from "./texture"

export const TILE_SIZE = 50;

export class Tile extends THREE.Object3D {
	constructor(texture) {
		super();
		this.spriteMaterial = new THREE.SpriteMaterial({ map: texture ? texture : TEX.TILE_TEXTURE});
		this.add(new THREE.Sprite(this.spriteMaterial));
		this.scale.set(TILE_SIZE, TILE_SIZE, 1);
	}

	setPos(x, y) {
		this.position.set(x * TILE_SIZE, y * TILE_SIZE, 0);
	}

	getPos() { return this.pos; }
}

export class Ground extends Tile
{
	constructor() {
		super();
	}
}

export class Plug extends Tile
{
	constructor() {
		super(TEX.PLUG_TEXTURE);
	}
}