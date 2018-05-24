import { asteroidVertices } from './helpers.js';

export default class Enemy {
    constructor(args) {
        this.type = args.type;
        this.position = { x: args.x, y: args.y }
        this.targetPosition = this.position;
        this.velocity = args.velocity
        this.rotation = 0;
        this.targetRotation = this.rotation;
        this.rotationSpeed = args.rotationSpeed;
        this.radius = args.size;
        this.score = (80 / this.radius) * 5;
        this.delete = false;
        this.vertices = asteroidVertices(8, args.size);
        this.masterImg = new Image();
        this.blastImg = new Image();
        this.fastImg = new Image();
        this.masterImg.src = `http://127.0.0.1:8887/enemies/master.png`;
        this.blastImg.src = `http://127.0.0.1:8887/enemies/blast.png`;
        this.fastImg.src = `http://127.0.0.1:8887/enemies/fast.png`;
        
    }

    destroy () {
        this.delete = true;
    }

    update (updateObj) {
        this.targetPosition.x = updateObj.x;
        this.targetPosition.y = updateObj.y;
        this.targetRotation = updateObj.rotation;
        this.delete = updateObj.delete;
        if (this.size !== updateObj.size) this.vertices = asteroidVertices(8, updateObj.size);
        this.size = updateObj.size;
        this.type = updateObj.type;
        this.velocity = updateObj.velocity;
    }

    render (state) {
        // INTERPOLATE
        this.position.x += (this.targetPosition.x - this.position.x) * 0.16;
        this.position.y += (this.targetPosition.y - this.position.y) * 0.16;
        this.rotation += (this.targetRotation - this.rotation);
        // Draw
        const context = state.context;
        context.save();
        context.translate(this.position.x, this.position.y);
        context.rotate(this.rotation * Math.PI / 180);
        if (this.type === 'master') {
            context.drawImage(this.masterImg, -35, -35, 75, 75);
        } else if (this.type === 'blast') {
            context.drawImage(this.blastImg, -50, -50, 100, 100);
        } else if (this.type === 'fast') {
            context.drawImage(this.fastImg, -15, -15, 35, 35);
        } else {
            context.strokeStyle = '#f1f1f1';
            context.lineWidth = 2;
            context.beginPath();
            context.moveTo(0, -this.radius);
            for (let i = 1; i < this.vertices.length; i++) {
                context.lineTo(this.vertices[i].x, this.vertices[i].y);
            }
            context.closePath();
            context.stroke();
        }
        context.restore();
    }
}