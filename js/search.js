function Search(){
			this.txt=document.getElementById("txt")
			this.div=document.getElementById("list")
			this.url = "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su"
			this.addEvent();
		}
		
		Search.prototype.addEvent = function(){
			var that=this;
			this.txt.onkeyup=function(){
				that.val=this.value
				that.load()
			}
		}
		
		Search.prototype.load=function(){
			var that=this;
			jsonp(this.url,function(res){
				that.res=res
				that.display()
			},{
				_name:"cb",
				cb:"sfsf",
				wd:this.val
			})
		}
		
		Search.prototype.display=function(){
			console.log(this.res.s)
			var str = ""
			this.res.s.forEach(function(v){
				str += `<li>${v}</li>`
			})
			this.div.innerHTML = str;
		}
		
		new Search()