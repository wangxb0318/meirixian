    function Magnifier(){
        this.sBox = document.querySelector(".s-box")
        this.bBox = document.querySelector(".b-box")
        this.span = document.querySelector(".s-box span")
        this.bImg = document.querySelector(".b-box img")

        this.init()
    }
    Magnifier.prototype.init = function(){
        var that = this;
        this.sBox.onmouseover = function(){
            that.show()
        }
        this.sBox.onmouseout = function(){
            that.hide()
        }
        this.sBox.onmousemove = function(eve){
            var e = eve || window.event
            that.move(e)
        } 
    }
    Magnifier.prototype.move = function(e){

        var l = e.pageX - this.sBox.offsetLeft -this.span.offsetWidth/2
        var t = e.pageY - this.sBox.offsetTop -this.span.offsetHeight/2

        if(l<0){
            l = 0
        }
        if(t<0){
            t = 0
        }
        if(l>this.sBox.offsetWidth - this.span.offsetWidth){
            l = this.sBox.offsetWidth - this.span.offsetWidth
        }
        if(t>this.sBox.offsetHeight - this.span.offsetHeight){
            t = this.sBox.offsetHeight - this.span.offsetHeight
        }

        this.span.style.left = l + "px"
        this.span.style.top = t + "px"

        var x = l/(this.sBox.offsetWidth - this.span.offsetWidth)
        var y = t/(this.sBox.offsetHeight - this.span.offsetHeight)

        this.bImg.style.left = x * (this.bBox.offsetWidth - this.bImg.offsetWidth) + "px";
        this.bImg.style.top = y *(this.bBox.offsetHeight - this.bImg.offsetHeight) + "px";

    }
    Magnifier.prototype.show = function(){
        this.span.style.display = "block";
        this.bBox.style.display = "block";
    }
    Magnifier.prototype.hide = function(){
        this.span.style.display = "none";
        this.bBox.style.display = "none";
    }

    



    class Xq {
        constructor() {
            this.box = document.querySelector(".intro-left");
            this.url = 'http://localhost/meirixian/list.json';
            this.init()
        }
        init (){
        var that = this;
        ajax({
            url:this.url,
            success:function(res){
                that.res = JSON.parse(res)
                that.getCookie()
                
            }       
        })
    }
    getCookie (){
        this.goods = JSON.parse(getCookie("xq")) 
        console.log(this.goods)
         
        this.display()
    }
    display() {
            var str = ""       
        for(var i=0;i<this.res.length;i++){
            for(var j=0;j<this.goods.length;j++){
    
                if( this.res[i].id == this.goods[j].id){
                    str += `<div class="s-box">
                        <img src=${this.res[i].src} alt="">
                        <span></span>
                    </div>
                    <div class="b-box">
                        <img src=${this.res[i].src} alt="">
                    </div>
                    <div class="b-box">
                        <img src=${this.res[i].title} alt="">
                    </div>`
                }
            }
        }
        
        this.box.innerHTML = str;
        new Magnifier();
        }
    }
    new Xq() 


