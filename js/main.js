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
/*window.onload=function () {
    var hl=$(".my_aside").outerHeight();
    var hr=$(".my_content").outerHeight();
    var mh=Math.max(hl,hr);
    $(".my_aside").height(mh);
    $(".my_content").height(mh);
}*/
//搜索输入框输入事件
function  searchTree() {
    //搜索大小写问题
    jQuery.expr[':'].contains = function (a,i,m) {
        return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase())>=0;
    };
    $("#search input").on("input",function (e) {
        e.preventDefault();

        //获取input输入框内容
        var inputContent = e.currentTarget.value;

        //没值就收起父目录，但是得把active的父母来都打开
        if(inputContent.length === 0){
            $(".fa-folder-open").removeClass("fa-folder-open").addClass("fa-folder");
            $("#tree ul").css("display","none");
            if($("#tree.active").length){
                showActiveTree($("#tree.active"),true);
            }
            else{
                $("#tree").children().css("display","block");
            }
        }
        //有值就搜索，并且展开父目录
        else{
            $(".fa-folder").removeClass("fa-folder").addClass("fa-folder-open");
            $("#tree ul").css("display","none");
            var searchResult = $("#tree li").find("a:contains('"+inputContent+"')");
            if(searchResult.length){
                showActiveTree(searchResult.parent(),false)
            }
        }
    });
}
