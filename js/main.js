$(document).ready(function(){
    clickTreeDirectory();
});
//点击目录事件
function  clickTreeDirectory() {
    //判断有active，递归循环把父目录打开
    var treeActive = $("#tree.active");
    if(treeActive.length){
        showActiveTree(treeActive,true);
    }
    //点击目录，触发折叠效果
    $(document).on("click","#tree a[class='directory']",function (e) {
        event.preventDefault();
        var icon = $(this).children(".fa");
        var iconIsOpen = icon.hasClass("fa-folder-open");
        var subTree = $(this).siblings("ul");
        icon.removeClass("fa-folder-open").removeClass("fa-folder");
        if(iconIsOpen){
            if(typeof subTree!="undefined"){
                subTree.slideUp({duration:100});
            }
            icon.addClass("fa-folder");
        }else{
            if(typeof subTree!="undefined"){
                subTree.slideDown({duration:100});
            }
            icon.addClass("fa-folder-open");
        }
    });
}
//循环递归展开父节点
function showActiveTree(jqNode,isSiblings) {
    if(jqNode.attr("id")==="tree"){return;}
    if(jqNode.is("ul")) {
        jqNode.css("display", "block");
        if (isSiblings) {
            jqNode.siblings().css("display", "block");
            jqNode.siblings("a").css("display", "inline");
            jqNode.siblings("a").find(".fa-folder").removeClass("fa-folder").addClass("fa-folder-open");
        }
    }
    jqNode.each(function () {
        showActiveTree($(this).parent(),isSiblings);

    });
}
