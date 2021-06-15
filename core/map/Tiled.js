import { loadImage, loadJSON } from "../utils/loaders.js";
import Tile from "./Tile.js";

export default class Tiled {
  static async parse(mapData) {
    //TODO support multiple compression levels
    //TODO support infinite map size
    if (mapData.compressionlevel != -1 || mapData.infinite != false)
      return null;

    //The game is isometric
    if (mapData.orientation != "orthogonal") return null;

    //We're using 1.7.0 / 1.7
    if (mapData.tiledversion != "1.7.0" || mapData.version != "1.6")
      return null;

    let tileIds = new Set();
    for (let layer of mapData.layers) {
      for (let tileId of layer.data) {
        tileIds.add(tileId);
      }
    }

    let tiles = {};

    for (let tileset of mapData.tilesets) {
      let tilesetImage = await loadImage("/maps/SampleMap/" + tileset.image);
      for (let tileId of tileIds) {
        if (
          !(tileId in tiles) &&
          tileId >= tileset.firstgid &&
          tileId < tileset.tilecount + tileset.firstgid
        ) {
          let x = (tileId - tileset.firstgid) % tileset.columns;

          let y = Math.floor((tileId - tileset.firstgid) / tileset.columns);
          x %= tileset.imagewidth;
          tiles[tileId] = new Tile(
            tilesetImage,
            x * tileset.tilewidth,
            y * tileset.tileheight,
            tileset.tilewidth,
            tileset.tileheight
          );
        }
      }
    }

    return tiles;
  }
}
