function Che(){
    this.tbody = document.querySelector("tbody")
    this.url = "http://localhost/meirixian/list.json"

    this.init()

    this.addEvent()
    // this.getData()
}
Che.prototype.init = function(){
    var that = this;
    ajax({
        url:this.url,
        success:function(res){
            that.res = JSON.parse(res)
            that.getCookie()
        }       
    })
}
Che.prototype.getCookie = function(){
    this.goods = getCookie("goods")!="" ? JSON.parse(getCookie("goods")) : [];
    console.log(this.res)
    this.display()
}
Che.prototype.display = function(){
    var str = ""
    for(var i=0;i<this.res.length;i++){
        for(var j=0;j<this.goods.length;j++){
            if(this.res[i].id == this.goods[j].id){
                str += `<tr index="${this.goods[j].id}">
                            <td><img src="${this.res[i].src}"/></td>
                            <td>${this.res[i].title}</td>
                            <td>${this.res[i].price}</td>
                            <td><input type="number" min=1 value="${this.goods[j].num}" class="num"></td>
                            <td><em class="dele">删除</em></td>
                        </tr>`;
            }
        }
    }
    this.tbody.innerHTML = str;
}
Che.prototype.addEvent = function(){
    var that = this;
    this.tbody.addEventListener("input",function(eve){
        var e = eve || window.event;
        var target = e.target || e.srcElement;
        if(target.className == "num"){
            that.num = target.value;
            that.id = target.parentNode.parentNode.getAttribute("index");
            that.changeCookie(function(i){
                that.goods[i].num = that.num
            })
        }
    })
    this.tbody.addEventListener("click",function(eve){
        var e = eve || window.event;
        var target = e.target || e.srcElement;
        if(target.className == "dele"){
            that.id = target.parentNode.parentNode.getAttribute("index");
            target.parentNode.parentNode.remove();
            that.changeCookie(function(i){
                that.goods.splice(i,1)
            })
        }
    })
}
Che.prototype.changeCookie = function(callback){
    for(var i=0;i<this.goods.length;i++){
        if(this.goods[i].id == this.id){
            callback(i)
        }
    }
    setCookie("goods",JSON.stringify(this.goods))
}
new Che();
