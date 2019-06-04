    var ouser = document.getElementById("user");
    var opass = document.getElementById("pass");
    var otel = document.getElementById("tel");
    var obtn = document.getElementById("btn");

    var userOnOff = passOnOff = telOnOff = false;

    ouser.onblur = function(){
        var reg = /^[\u2E80-\u9FFF\w-]{4,20}$/
        if(reg.test(this.value)){
            this.nextElementSibling.innerHTML = "用户名成功";

            userOnOff = true;
        }else{
            this.nextElementSibling.innerHTML = "用户名不符";

            userOnOff = false;
        }
    }

    opass.onblur = function(){
        var a=b=c=0;

        var lengthReg = /^.{6,18}$/;
        if(!lengthReg.test(this.value)){
            this.nextElementSibling.innerHTML = "长度不符";

            passOnOff = false;
            return;
        }

        var numReg = /\d/;
        if(numReg.test(this.value)){
            a = 1;
        }
        var azReg = /[a-zA-Z]/;
        if(azReg.test(this.value)){
            b = 1;
        }
        var tsReg = /[\W_]/;
        if(tsReg.test(this.value)){
            c = 1;
        }

        switch(a+b+c){
            case 1:
                this.nextElementSibling.innerHTML = "简单";break;
            case 2:
                this.nextElementSibling.innerHTML = "一般";break;
            case 3:
                this.nextElementSibling.innerHTML = "困难";break;
        }
        passOnOff = true;
    }

    otel.onblur = function(){
        var reg = /1[3-9]\d{9}$/;
        if(reg.test(this.value)){
            this.nextElementSibling.innerHTML = "符合";
            telOnOff = true;
        }else{
            this.nextElementSibling.innerHTML = "不符合";
            telOnOff = false;
        }
    }

    obtn.onclick = function(){
        if(userOnOff && passOnOff && telOnOff){
            alert("全部成功")
        }else{
            alert("失败")
        }
    }



    class Register{
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
                that.setData();
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
        setData(){
            if(this.data.length == 0){
                this.data.push({
                    user:this.user.value,
                    pass:this.pass.value,
                    tel:this.tel.value,
                    onOff:0
                })
                this.span.innerHTML = "注册成功";
                localStorage.setItem("data",JSON.stringify(this.data))
            }else{
                for(var i=0;i<this.data.length;i++){
                    if(this.data[i].user === this.user.value){
                        this.span.innerHTML = "重名了";
                        return;
                    }
                } 
                this.data.push({
                    user:this.user.value,
                    pass:this.pass.value,
                    tel:this.tel.value,
                    onOff:0
                })
                this.span.innerHTML = "注册成功";
                localStorage.setItem("data",JSON.stringify(this.data))   
            }
        }
    }

    new Register;