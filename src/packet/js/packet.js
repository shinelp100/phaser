(function () {
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    var w = c.width = window.innerWidth;
    var h = c.height = window.innerHeight;
    var clearColor = 'rgba(0,0,0,.1)';
    var drops = [];
    var myImage = new Image();
    myImage.src = "./images/packet.png";


    function random(min, max) {
        return Math.random() * (max - min) + min;
    }

    function RainDrop() {
    }

    RainDrop.prototype = {
        init: function () {
            this.x = random(0, w);//雨滴的位置x
            this.y = 0;//雨滴的位置y
            // this.color = 'hsl(180, 100%, 50%)';//雨滴颜色 长方形的填充色
            this.vy = random(4, 5);//雨滴下落速度
            this.hit = random(h * 1.1, h * 1.2);//下落的最大值
        },
        draw: function () {
            if (this.y < this.hit) {
                // ctx.fillStyle = this.color;

                ctx.drawImage(myImage, this.x, this.y);
                // ctx.fillRect(this.x, this.y, this.size, this.size * 5);//绘制长方形，通过多次叠加长方形，形成雨滴下落效果
            }
            this.update();//更新位置
        },
        update: function () {
            if (this.y < this.hit) {
                this.y += this.vy;//未达到底部，增加雨滴y坐标
            } else {
                this.init();
            }
        }
    };

    function resize() {
        w = c.width = window.innerWidth;
        h = c.height = window.innerHeight;
    }

    function setup() {
        for (var i = 0; i < 6; i++) {
            (function (j) {
                setTimeout(function () {
                    var r = new RainDrop();
                    r.init();
                    drops.push(r);
                }, j * 200)
            }(i));
        }
    }

    function anim() {
        ctx.clearRect(0, 0, c.width, c.height);
        // ctx.fillStyle = clearColor;//每一帧都填充背景色
        // ctx.fillRect(0,0,w,h);//填充背景色，注意不要用clearRect，否则会清空前面的雨滴，导致不能产生叠加的效果
        for (var i in drops) {
            drops[i].draw();
        }
        requestAnimationFrame(anim);
    }


    c.addEventListener('click', function (event) {
        var event = window.event || event;
        event.stopPropagation();
        console.log(this);
        // if(!this){
        //     alert('clicked packet');
        // }
    });


    window.addEventListener("resize", resize);

    setup();
    anim();
})(window);
