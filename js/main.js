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

//pjax
$(document).ready(function () {
    clickTreeDirectory();
    searchTree();
    pjaxLoad();
});
function  pjaxLoad() {
    $(document).pjax('tree a','#content',{
        fragment:'#content',timeout:8000});
    $(document).pjax('#menu a','#content',{
        fragment:'#content',timeout:8000});

    $(document).on({
        "pjax:complete":function (e) {
            $("pre code").each(function (i, block) {
                hljs.highlightBlock(block);
            });
            //添加active
            $("#tree.active").removeClass("active");
            e.relatedTarget.parentNode.classList.add("active");
        }
    })
}
//添加文字特效
var my_border = function (r) {
    function t() {
        return b[Math.floor(Math.random() * b.length)]
    }
    function e() {
        return String.fromCharCode(94 * Math.random() + 33)
    }
    function n(r) {
        for (var n = document.createDocumentFragment(), i = 0; r > i; i++) {
            var l = document.createElement("span");
            l.textContent = e(), l.style.color = t(), n.appendChild(l)
        }
        return n
    }
    function i() {
        var t = o[c.skillI];
        c.step ? c.step-- : (c.step = g, c.prefixP < l.length ? (c.prefixP >= 0 && (c.text += l[c.prefixP]), c.prefixP++) : "forward" === c.direction ? c.skillP < t.length ? (c.text += t[c.skillP], c.skillP++) : c.delay ? c.delay-- : (c.direction = "backward", c.delay = a) : c.skillP > 0 ? (c.text = c.text.slice(0, -1), c.skillP--) : (c.skillI = (c.skillI + 1) % o.length, c.direction = "forward")), r.textContent = c.text, r.appendChild(n(c.prefixP < l.length ? Math.min(s, s + c.prefixP) : Math.min(s, t.length - c.skillP))), setTimeout(i, d)
    }
    var l = "",
        o = ["不乱于心，不困于情，不畏将来，不念过往，如此，安好。"].map(function (r) {
            return r + ""
        }),
        a = 2,
        g = 1,
        s = 5,
        d = 75,
        b = ["rgb(110,64,170)", "rgb(150,61,179)", "rgb(191,60,175)", "rgb(228,65,157)", "rgb(254,75,131)", "rgb(255,94,99)", "rgb(255,120,71)", "rgb(251,150,51)", "rgb(226,183,47)", "rgb(198,214,60)", "rgb(175,240,91)", "rgb(127,246,88)", "rgb(82,246,103)", "rgb(48,239,130)", "rgb(29,223,163)", "rgb(26,199,194)", "rgb(35,171,216)", "rgb(54,140,225)", "rgb(76,110,219)", "rgb(96,84,200)"],
        c = {
            text: "",
            prefixP: -s,
            skillI: 0,
            skillP: 0,
            direction: "forward",
            delay: a,
            step: g
        };
    i()
};
my_border(document.getElementById('my_border'));

//获取心知天气


