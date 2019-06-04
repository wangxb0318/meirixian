    class Login{
        constructor(){
            this.user = document.getElementById("user");
            this.pass = document.getElementById("pass");
            this.tel = document.getElementById("tel");
            this.btn = document.getElementById("btn");
            this.span = document.querySelector(".spanp");

            this.init();
            this.getData();
        }
        init(){
            var that = this;
            this.btn.onclick = function(){
                that.proving();
            }
        }
        getData(){
            this.data = localStorage.getItem("data");
            if(this.data == null){
                this.data = [];
            }else{
                this.data = JSON.parse(this.data)
            }
        }
        proving(){
            for(var i=0;i<this.data.length;i++){
                if(this.data[i].user == this.user.value && this.data[i].pass == this.pass.value){
                    this.span.innerHTML = "登录成功,1秒后跳转";

                    this.data[i].onoff = 1;
                    localStorage.setItem("data",JSON.stringify(this.data))

                    setTimeout(()=>{
                        location.href = "index.html";
                    },1000)
                    return;
                }
            }
            this.span.innerHTML = "登录失败";
        }
    }

    new Login();