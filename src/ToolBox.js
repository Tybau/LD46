import * as THREE from 'three';
import DragControls from 'three-dragcontrols';

import * as TOOLS from './Tools';

export class ToolBox extends THREE.Object3D {
	constructor(camera, renderer) {
		super();

		this.tools = [];

		this.addTool(new TOOLS.GoUp());
		this.addTool(new TOOLS.GoRight());
		this.addTool(new TOOLS.GoDown());
		this.addTool(new TOOLS.GoLeft());

		let controls = new DragControls(this.tools, camera, renderer.domElement);

		controls.addEventListener('dragstart', this.onToolDrag);
		controls.addEventListener('dragend', this.onToolRealease);
	}

	addTool(tool)
	{
		let i = this.tools.length;

		if(this.tools[i])
			this.remove(this.tools[i]);
		
		this.tools[i] = tool;

		let x = (i % 3) * 2 + 10;
		let y = (Math.floor(i / 3)) * 2;

		this.tools[i].setPos(x, y);
		this.add(this.tools[i]);
	}

	onToolDrag(event) {

	}

	onToolRealease(event) {
		let tool = event.object;
		tool.setPos(tool.getAnchor().x, tool.getAnchor().y);
	}
}

export function loadMap(mapName)
{
	let mapString = require(`../maps/${mapName}.txt`);
	let size = mapString.length + (mapString[mapString.length - 1] !== "\n");
	let width = mapString.indexOf('\n');
	let height = size / (width + 1);

	mapString = mapString.replace(/\r?\n|\r/gm, "");
	size -= height;

	console.log(mapString, size, width, height);

	let map = new Map(width, height);

	for (let y = 0; y < height; ++y)
	{
		for (let x = 0; x < width; x++)
		{
			//console.log(x, y);
			map.setTile(x, y, new tilesMap[mapString[x + y * width]]);
		}
	}
	return map;
}