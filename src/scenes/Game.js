import Phaser from 'phaser';

export default class Game extends Phaser.Scene {

    init() {
        this.aiPlatformVelocity = new Phaser.Math.Vector2(0, 0);
    }

    preload() {
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    create() {
        this.ball = this.add.circle(400, 250, 10, 0xffffff, 1)
        this.physics.add.existing(this.ball);
        this.ball.body.setBounce(1, 1)

        this.ball.body.setCollideWorldBounds(true, 1, 1)

        this.ball.body.setVelocity(Phaser.Math.Between(150, 200), Phaser.Math.Between(-150, -200))

        this.platform = this.add.rectangle(50, 250, 20, 100, 0xFFFFFF, 1)
        this.physics.add.existing(this.platform, true);
        
        this.aiPlatform = this.add.rectangle(750, 250, 20, 100, 0xFFFFFF, 1)
        this.physics.add.existing(this.aiPlatform, true)

        this.physics.add.collider(this.ball, this.aiPlatform)
        this.physics.add.collider(this.ball, this.platform)
    }

    update() {
        if(this.cursors.up.isDown){
            this.platform.y -= 10
            this.platform.body.updateFromGameObject();
        } else if(this.cursors.down.isDown){
            this.platform.y += 10
            this.platform.body.updateFromGameObject();
        }

        const diff = this.ball.y - this.aiPlatform.y;
        if(Math.abs(diff) < 10){
            return
        }

        const aiSpeed = 3;
        if(diff < 0) {
            this.aiPlatformVelocity.y = -aiSpeed;
            if(this.aiPlatformVelocity.y < -10){
                this.aiPlatformVelocity.y = -10
            }
        } else if (diff > 0) { 
            this.aiPlatformVelocity.y = aiSpeed;
            if(this.aiPlatformVelocity.y > 10){
                this.aiPlatformVelocity.y = 10
            }
        }

        this.aiPlatform.y += this.aiPlatformVelocity.y;
        this.aiPlatform.body.updateFromGameObject();
    }
} 