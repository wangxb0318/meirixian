
    $(".banner1").banner({
    items:$(".banner1").children(".imgbox").children("a"),      //必选
    // 可选，左右按钮，不传，默认没有功能
    left:$(".banner1").find("#left"),
    right:$(".banner1").find("#right"),
    // // 可选，下标按钮，默认为true，false为不生成
    list:false,
    
})
