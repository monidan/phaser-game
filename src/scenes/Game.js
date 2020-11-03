import Phaser from 'phaser';

import WebFontFile from './WebFontFile';

export default class Game extends Phaser.Scene {

    init() {
        this.aiPlatformVelocity = new Phaser.Math.Vector2(0, 0);
        this.scoreNumber = 0;
    }

    preload() {
        this.cursors = this.input.keyboard.createCursorKeys();
        const fonts = new WebFontFile(this.load, 'Press Start 2P');
        this.load.addFile(fonts);
    }

    create() {
        this.physics.world.setBounds(-100, 0, 1000, 500)

        this.ball = this.add.circle(400, 250, 10, 0xffffff, 1)
        this.physics.add.existing(this.ball);
        this.ball.body.setBounce(1, 1)

        const angle = Phaser.Math.Between(0, 360);
        const vec = this.physics.velocityFromAngle(angle, 200);

        this.ball.body.setCollideWorldBounds(true, 1, 1)

        this.ball.body.setVelocity(vec.x, vec.y)

        this.platform = this.add.rectangle(50, 250, 20, 100, 0xFFFFFF, 1)
        this.physics.add.existing(this.platform, true);
        
        this.aiPlatform = this.add.rectangle(750, 250, 20, 100, 0xFFFFFF, 1)
        this.physics.add.existing(this.aiPlatform, true)

        this.score = this.add.text(330, 20, 'Score: ' + this.scoreNumber, {
            fontSize: 24,
            fontFamily: '"Press Start 2P"'
        })

        this.physics.add.collider(this.ball, this.platform)
        this.physics.add.collider(this.ball, this.aiPlatform)
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

        const aiSpeed = 2;
        if(diff < 0) {
            this.aiPlatformVelocity.y = -aiSpeed;
            if(this.aiPlatformVelocity.y < -10){
                this.aiPlatformVelocity.y = -5
            }
        } else if (diff > 0) { 
            this.aiPlatformVelocity.y = aiSpeed;
            if(this.aiPlatformVelocity.y > 10){
                this.aiPlatformVelocity.y = 5
            }
        }

        this.aiPlatform.y += this.aiPlatformVelocity.y;
        this.aiPlatform.body.updateFromGameObject();

        if(this.ball.body.x > 830){
            this.scoreNumber++;
            this.score.setText(`Score: ${this.scoreNumber}`);
            
            this.resetBall()
        } else if(this.ball.x < -30) {
            this.scoreNumber--;
            this.score.setText(`Score: ${this.scoreNumber}`);
            this.resetBall();
        }
    }

    resetBall() {
        this.ball.setPosition(400, 250)

        const angle = Phaser.Math.Between(0, 360);
        const vec = this.physics.velocityFromAngle(angle, 200);

        this.ball.body.setVelocity(vec.x, vec.y)
    }
} 