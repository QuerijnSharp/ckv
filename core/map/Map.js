import { loadImage, loadJSON } from "../utils/loaders.js";
import Tiled from "./Tiled.js";
import LayerType from "./LayerType.js";
import Vector2 from "../math/Vector2.js";

export default class Map {
  constructor() {
    this.layers = [];
  }

  async init(mapName) {
    this.loaded = false;

    this.mapName = mapName;

    this.mapData = await loadJSON(`maps/Snowfall/${mapName}.json`); //TODO
    this.tiles = await Tiled.parse(this.mapData);
    this.width = this.mapData.width * this.mapData.tilewidth;
    this.height = this.mapData.height * this.mapData.tileheight;

    for (let layer of this.mapData.layers) {
      let currentColumn = layer.x ?? 0; //test
      let currentRow = layer.y ?? 0;

      let buffer = document.createElement("canvas");
      buffer.height = layer.height * this.mapData.tileheight;
      buffer.width = layer.width * this.mapData.tilewidth;
      let ctx = buffer.getContext("2d");

      for (let tileIdx = 0; tileIdx < layer.data.length; tileIdx++) {
        let tileId = layer.data[tileIdx];
        currentColumn += 1;
        if (currentColumn >= layer.width) {
          currentColumn = 0;
          currentRow += 1;
        }

        if (tileId == 0) continue;
        if (!(tileId in this.tiles)) {
          console.log(tileId, this.tiles);
        }

        ctx.drawImage(
          this.tiles[tileId].tileMap,
          this.tiles[tileId].tileMapOffsetX,
          this.tiles[tileId].tileMapOffsetY,
          this.tiles[tileId].tileWidth,
          this.tiles[tileId].tileHeight,
          (currentColumn - 1) * this.tiles[tileId].tileWidth,
          currentRow * this.tiles[tileId].tileHeight,
          this.tiles[tileId].tileWidth,
          this.tiles[tileId].tileHeight
        );
      }
      let layerType = layer.properties
        ? layer.properties.find((s) => s.name == "LayerType")
        : null;
      this.layers.push({
        mapImage: buffer,
        layerType: layerType.value,
        innerLayer: layer,
      });
    }
  }

  update(time, game) {}

  blockCollision(oldPosition, newPosition, layer) {
    let cachePosition = new Vector2(0, 0);
    cachePosition = newPosition.copy();
    if (newPosition.x - oldPosition.x < 0) {
      let x1 = Math.floor((newPosition.x + 1) / 32);
      let y1 = Math.floor((newPosition.y + 31) / 32);

      let xy = layer.innerLayer.data[y1 * layer.innerLayer.width + x1];
      if (xy != 0) {
        cachePosition.x = oldPosition.x;
      }

      y1 = Math.floor((newPosition.y + 1) / 32);
      xy = layer.innerLayer.data[y1 * layer.innerLayer.width + x1];
      if (xy != 0) {
        cachePosition.x = oldPosition.x;
      }
    } else if (newPosition.x - oldPosition.x > 0) {
      let x1 = Math.floor((newPosition.x + 31) / 32);
      let y1 = Math.floor((newPosition.y + 31) / 32);

      let xy = layer.innerLayer.data[y1 * layer.innerLayer.width + x1];
      if (xy != 0) {
        cachePosition.x = oldPosition.x;
      }

      y1 = Math.floor((newPosition.y + 1) / 32);
      xy = layer.innerLayer.data[y1 * layer.innerLayer.width + x1];
      if (xy != 0) {
        cachePosition.x = oldPosition.x;
      }
    }

    if (cachePosition.y - oldPosition.y < 0) {
      let x1 = Math.floor((cachePosition.x + 1) / 32);
      let y1 = Math.floor((newPosition.y + 1) / 32);
      let xy = layer.innerLayer.data[y1 * layer.innerLayer.width + x1];
      if (xy != 0) {
        newPosition.y = oldPosition.y;
      }

      x1 = Math.floor((cachePosition.x + 31) / 32);
      xy = layer.innerLayer.data[y1 * layer.innerLayer.width + x1];
      if (xy != 0) {
        newPosition.y = oldPosition.y;
      }
    } else if (cachePosition.y - oldPosition.y > 0) {
      let x1 = Math.floor((cachePosition.x + 1) / 32);
      let y1 = Math.floor((newPosition.y + 31) / 32);
      let xy = layer.innerLayer.data[y1 * layer.innerLayer.width + x1];
      if (xy != 0) {
        newPosition.y = oldPosition.y;
      }

      x1 = Math.floor((cachePosition.x + 31) / 32);
      xy = layer.innerLayer.data[y1 * layer.innerLayer.width + x1];
      if (xy != 0) {
        newPosition.y = oldPosition.y;
      }
    }

    if (newPosition.x - oldPosition.x < 0) {
      let x1 = Math.floor((newPosition.x + 1) / 32);
      let y1 = Math.floor((newPosition.y + 31) / 32);

      let xy = layer.innerLayer.data[y1 * layer.innerLayer.width + x1];
      if (xy != 0) {
        newPosition.x = oldPosition.x;
      }

      y1 = Math.floor((newPosition.y + 1) / 32);
      xy = layer.innerLayer.data[y1 * layer.innerLayer.width + x1];
      if (xy != 0) {
        newPosition.x = oldPosition.x;
      }
    } else if (newPosition.x - oldPosition.x > 0) {
      let x1 = Math.floor((newPosition.x + 31) / 32);
      let y1 = Math.floor((newPosition.y + 31) / 32);

      let xy = layer.innerLayer.data[y1 * layer.innerLayer.width + x1];
      if (xy != 0) {
        newPosition.x = oldPosition.x;
      }

      y1 = Math.floor((newPosition.y + 1) / 32);
      xy = layer.innerLayer.data[y1 * layer.innerLayer.width + x1];
      if (xy != 0) {
        newPosition.x = oldPosition.x;
      }
    }
  }

  enitityCollision(oldPosition, newPosition, entity) {
    //Get the map layer and check a rough area.
  }

  drawBackground(ctx, game) {
    for (let layer of this.layers.filter(
      (s) =>
        s.layerType == LayerType.Background || s.layerType == LayerType.WalkOver
    )) {
      ctx.drawImage(
        layer.mapImage,
        game.camera.visibleX,
        game.camera.visibleY,
        game.camera.fov.width,
        game.camera.fov.height,
        0,
        0,
        game.camera.fov.width,
        game.camera.fov.height
      );
    }
  }

  drawForeground(ctx, game) {
    for (let layer of this.layers.filter(
      (s) => s.layerType == LayerType.Foreground
    )) {
      ctx.drawImage(
        layer.mapImage,
        game.camera.visibleX,
        game.camera.visibleY,
        game.camera.fov.width,
        game.camera.fov.height,
        0,
        0,
        game.camera.fov.width,
        game.camera.fov.height
      );
    }
  }
}
