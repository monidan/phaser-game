import Phaser from 'phaser';

export default class Game extends Phaser.Scene {

    preload() {
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    create() {
        const ball = this.add.circle(400, 250, 10, 0xffffff, 1)
        this.physics.add.existing(ball);
        ball.body.setBounce(1, 1)

        ball.body.setCollideWorldBounds(true, 1, 1)

        ball.body.setVelocity(-200, 0)

        this.platform = this.add.rectangle(50, 250, 20, 100, 0xFFFFFF, 1)
        this.physics.add.existing(this.platform, true);
        
        this.aiPlatform = this.add.rectangle(750, 250, 20, 100, 0xFFFFFF, 1)

        this.physics.add.collider(ball, this.platform)
    }

    update() {
        if(this.cursors.up.isDown){
            this.platform.y -= 5
            this.platform.body.updateFromGameObject();
        } else if(this.cursors.down.isDown){
            this.platform.y += 5
            this.platform.body.updateFromGameObject();
        }
    }
} 