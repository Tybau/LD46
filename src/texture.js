import * as THREE from 'three';

export const PLUG_TEXTURE = getTexture("plug.png");
export const TILE_TEXTURE = getTexture("tile.png");
export const SLOT_TEXTURE = getTexture("slot.png");
export const LAVA_TEXTURE = getTexture("lava.png");

export function getTexture(path) {
	let tex = new THREE.TextureLoader().load(path);
	tex.magFilter = THREE.NearestFilter;
	tex.minFilter = THREE.NearestFilter;

	return tex;
}