function Goods(){
		this.cont = document.getElementById("frame");
		this.url = 'http://localhost/meirixian/list.json';
		this.init();
		this.addEvent();
	}
	Goods.prototype.init = function(){
		var that = this;
		ajax({
			url:this.url,
			success:function(res){
				that.res = JSON.parse(res)
				that.display()
			}       
		})
	}
	Goods.prototype.display = function(){
		var str = "";
		for(var i=0;i<this.res.length;i++){
			str += `<li class="li" index="${this.res[i].id}">                   
			<a href="/meirixian/details.html##?id=${this.res[i].id}">
						<img src="${this.res[i].src}">
						<p>${this.res[i].title}</p>
						<p>${this.res[i].price}</p>
						</a>
						<em class="add">加入购物车</em>

					   
					</li>`
		}
		this.cont.innerHTML = str;
	}
	Goods.prototype.addEvent = function(){
		var that = this;
		this.data = localStorage.getItem("data");
				if(this.data == null){
					this.data = []
				}else{
					this.data = JSON.parse(this.data)
				}
	
		this.cont.addEventListener("click",function(eve){
			var e = eve || window.event;
			var target = e.target || e.srcElement;
			if(target.className == "add"){
				// that.getData();
				that.id = target.parentNode.getAttribute("index");
				// console.log(that.id)
				that.setCookie()
			}
		})
	}
	Goods.prototype.setCookie = function(){
		let shu = 0;
	
		this.goods = getCookie("goods");
		// console.log(this.goods)
		if(this.goods == undefined){
			this.goods = [{
				id:this.id,
				num:1
			}];
		}else{
			var onoff = true;
			this.goods = JSON.parse(this.goods);
			for(var i=0;i<this.goods.length;i++){
				if(this.goods[i].id == this.id){
					this.goods[i].num++;
					onoff = false;
				}
				shu +=this.goods[i].num;
			}
			console.log(shu)
			if(onoff){
				this.goods.push({
					id:this.id,
					num:1
				});
				shu +=1;
			}
		}
		setCookie("goods",JSON.stringify(this.goods));
	}
	new Goods();