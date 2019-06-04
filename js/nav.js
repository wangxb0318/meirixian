function nav (){
    this.bUrl = "http://localhost/meirixian/nav.php";
    this.ul = $(".goods-ul");

    this.init();
}

nav.prototype.init = function(){
    let that = this;
    $.get(this.bUrl,function(res){
        that.res = JSON.parse(res);
        that.display(that.res);
    })
}

nav.prototype.display = function(res){
    let that = this;
    for(var i=0; i<res.length;i++){
        this.navHTML = `<li><a href="">${res[i].one}</a><div class="sou"></div></li>`

        this.ul.append(this.navHTML);
    }
    for(var i=0;i<res.length;i++){
        for(var j=0;j<res[i].two.length;j++){
            this.two = `<p><a href="">${res[i].two[j]}</a></p>`
            $(".sou").eq(i).append(this.two);
        }
    }
}

new nav();