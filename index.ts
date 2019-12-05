const w : number = window.innerWidth
const h : number = window.innerHeight
const scGap : number = 0.02
const strokeFactor : number = 90
const nodes : number = 5
const sizeFactor : number = 2.9
const foreColor : string = "#00c853"
const backColor : string = "#bdbdbd"
const rFactor : number = 2

class ScaleUtil {

    static maxScale(scale : number, i : number, n : number) : number {
        return Math.max(0, scale - i / n)
    }

    static divideScale(scale : number, i : number, n : number) : number {
        return Math.min(1 / n, ScaleUtil.maxScale(scale, i, n)) * n
    }

    static sinify(scale : number) : number {
        return Math.sin(Math.PI * scale)
    }

    static cosify(scale : number) : number {
        return 1 - Math.sin(Math.PI / 2 + (Math.PI / 2) * scale)
    }
}

class DrawingUtil {

    static drawCircle(context : CanvasRenderingContext2D, x : number, y : number, r : number) {
        context.beginPath()
        context.arc(x, y, r, 0, 2 * Math.PI)
        context.fill()
    }

    static drawLine(context : CanvasRenderingContext2D, x1 : number, y1 : number, x2 : number, y2 : number) {
        context.beginPath()
        context.moveTo(x1, y1)
        context.lineTo(x2, y2)
        context.stroke()
    }

    static drawBallBouncyLine(context : CanvasRenderingContext2D, scale : number, size : number, w : number) {
        const r : number = size / rFactor
        const sf : number = ScaleUtil.sinify(scale)
        const sc : number = ScaleUtil.cosify(ScaleUtil.divideScale(scale, 1, 2))
        context.save()
        DrawingUtil.drawCircle(context, w / 2 - (w / 2 - size) * sc, -r, r)
        context.restore()
        context.save()
        context.translate(size + (w / 2 - size) * sf, 0)
        DrawingUtil.drawLine(context, -size, 0, size, 0)
        context.restore()
    }

    static drawBBLNode(context : CanvasRenderingContext2D, i : number, scale : number) {
        const gap : number = w / (nodes + 1)
        const size : number = gap / sizeFactor
        context.lineCap = 'round'
        context.lineWidth = Math.min(w, h) / strokeFactor
        context.strokeStyle = foreColor
        context.save()
        context.translate(0, gap * (i + 1))
        DrawingUtil.drawBallBouncyLine(context, scale, size, w)
        context.restore()
    }
}

class Stage {

    canvas : HTMLCanvasElement = document.createElement('canvas')
    context : CanvasRenderingContext2D

    initCanvas() {
        this.canvas.width = w
        this.canvas.height = h
        this.context = this.canvas.getContext('2d')
        document.body.appendChild(this.canvas)
    }

    render() {
        this.context.fillStyle = backColor
        this.context.fillRect(0, 0, w, h)
    }

    handleTap() {
        this.canvas.onmousedown = () => {

        }
    }

    static init() {
        const stage = new Stage()
        stage.initCanvas()
        stage.render()
        stage.handleTap()
    }
}
