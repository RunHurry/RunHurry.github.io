var na;
var co;
var so;
$(document).ready(function(){
    na=[];
    co=[];
    so=[];
    na=localStorage.n ? JSON.parse(localStorage.n) : [];
    co=localStorage.cos ? JSON.parse(localStorage.cos) : [];
    so=localStorage.src ? JSON.parse(localStorage.src) : [];
    localStorage.poisk=null;
    if(na!=null)
    for (var i=0;i<na.length;i++)
    {
        var block=$("<div>",{id:'item'});
        var s=$("<img>",{src:so[i],id:'tovar'});
        var name=$("<p>",{id:'nametov'});
        name.text(na[i]);
        var costov=$("<p>",{id:'costov',class:'stoimost'});
        costov.text(co[i]+" руб");
        var coltiv=$("<p>",{id:'coltiv',class:'stoimost'});
        coltiv.text(1);
        var sumt=$("<p>",{id:'sumt',class:'stoimost'});
        sumt.text(1*co[i]+" руб");
        block.append(s);
        block.append(name);
        block.append(costov);
        block.append(coltiv);
        block.append(sumt);
        var x=$("<a>",{class:'close'});
        x.on("click",function(){
            var y=$(this).prev().text().split(' ')[0];
            localStorage.rub=localStorage.rub-y;
            $("#ito").text("Итого: "+localStorage.getItem('rub')+ " руб");
            y=$(this).parent().find('img').attr('src');
            var f=$(this).parent().find('#costov').text().split(' ')[0];
            console.log(y);
            console.log(f);
            for(var i=0;i<na.length;i++){
                if(so[i]==y && f==co[i])
                {
                    na.splice(i,1);
                    co.splice(i,1);
                    so.splice(i,1);
                }
            }
            localStorage.src = JSON.stringify(so);
            localStorage.cos = JSON.stringify(co);
            localStorage.n = JSON.stringify(na);
            localStorage.col--;
            $(this).parent().remove();
            var t=$("#end").offset();
            console.log(t.top);
            $("#mainstor").css("height", t.top.toString()+"px");
            $("#main").css("height", t.top.toString()+"px");
        });
        block.append(x);
        $("#mainstor").append(block);
       
    } 
    $("#mainstor").append($("<div>",{id:'razdel'}));
    var y=$("<p>",{id:'ito'});
    y.text("Итого: "+localStorage.getItem('rub')+ " руб");
    $("#mainstor").append(y);
    $("#mainstor").append($("<div>",{id:'razdel'}));
    var end=$("<div>",{id:'end'});
    var but=$("<button>",{class:'button'});
    but.text("Сбросить все");
    but.on("click",function(){
        localStorage.src = null;
        localStorage.cos = null;
        localStorage.n = null;
        localStorage.col=0;
        localStorage.rub=0;
        $("*#item").remove();
        $("#ito").text("Итого: 0 руб");
        var t=$("#end").offset();
        console.log(t.top);
        $("#mainstor").css("height", t.top.toString()+"px");
        $("#main").css("height", t.top.toString()+"px");
    });
    end.append(but);
    end.append($("<input>",{type:'submit',value:"Перейти к оплате",id:"button"}));
    $("#mainstor").append(end);
    var t=$("#end").offset();
    $("#mainstor").css("height", t.top.toString()+"px");
    $("#main").css("height", t.top.toString()+"px");
});
