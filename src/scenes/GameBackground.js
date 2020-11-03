import Phaser from 'phaser';

export default class GameBackground extends Phaser.Scene {
    preload() {

    }

    create() {
        this.add.line(800, 500, -400, 0, -400, 1000, 0xFFFFFF)
            .setLineWidth(2.5, 2.5)
        this.add.circle(400, 250, 50)
            .setStrokeStyle(5, 0xFFFFFF, 1)
    }
}