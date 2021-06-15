export default class Tile {
    //TODO collision
    constructor(tileMap, tileMapOffsetX, tileMapOffsetY, tileWidth, tileHeight) {
        this.tileMap = tileMap;
        this.tileMapOffsetX = tileMapOffsetX;
        this.tileMapOffsetY = tileMapOffsetY;
        this.tileWidth = tileWidth;
        this.tileHeight = tileHeight;
    }
}