var q;
var k;
var a;
var b;
var c;
var u;
var ui;
var ua;
var ub;
var uc;
var bc;
var srca;
var costa;
var namea;
var namec;
var bn;
var maxc;
var minc;
var maxi;
$(document).ready(function(){
    minc=0;
    maxc=1000000;
    maxi=0;
    q=false;
    $("#col").text(localStorage.getItem('col'));
    $("#sums").text(localStorage.getItem('rub')+localStorage.getItem('kop'));
  $("#swipe").click(function(){
      if(!q)
        $( "#stors" ).animate({ "left": "+=300px" }, "slow" );
      else
         $( "#stors" ).animate({ "left": "-=300px" }, "slow" );
     q=!q;
  });
  srca=[];
  costa=[];
  namea=[];
  $.get("tab/allobj.xml")
                    .done(allobj);
  ui=0; ua=4;ub=8;uc=12,bc=1;
  function allobj(xmlDom){
            a=$('<div>', { class: 'line'});
            b=$('<div>', { class: 'line'});
            c=$('<div>', { class: 'line'});
            k=0;
            var m=localStorage.getItem('type');
            if(localStorage.getItem('poisk')!=='null')
            {
                m="all";
                namec=localStorage.getItem('poisk');
            }
            var y=$(xmlDom).find(m);
            y.find("objall").each(function(idx, e) {
                var nm = $(e).find("name").text();
                
                if(localStorage.getItem('poisk')!=='null') 
                {
                var nb=localStorage.getItem('poisk');
                var v = [nb.length+1];
                for(var i=0;i<=nb.length;i++)
                    v[i] = [nm.length+1];
                var p;
                v[0][0]=0;
                for(var i=0;i<=nb.length;i++) 
                    v[i][0]=i;
                for(var i=0;i<=nm.length;i++)
                    v[0][i]=i;
                for(var i=1;i<=nb.length;i++)
                    for(var j=1;j<=nm.length;j++)
                    {
                    if(nb[i - 1] == nm[j - 1])
                            p=0;
                        else
                            p=1;
                        v[i][j]=Math.min(Math.min(v[i-1][j]+1, v[i][j-1]+1),v[i-1][j-1]+p);
                    }
                    if(v[nb.length][nm.length]>3)
                        {return;}
                }
                
                var sr = $(e).find("imsrc").text();
                var ct = $(e).find("cost").text();
                if(maxi<Number(ct))
                    maxi=Number(ct);
                if(Number(ct)<minc || Number(ct)>maxc)
                    return;
                var block=$("<div>",{id:'obj'});
                var imtov=$("<div>",{id:'imtov'});
                var im=$("<img>",{src:sr});
                imtov.append(im);
                block.append(imtov);
                var p=$("<p>",{id:'nameobj'});
                p.text(nm);
                block.append($("<div>",{id:'objrazdel'}));
                block.append(p);
                p=$("<p>",{id:'costobj'});
                p.text(ct);
                block.append(p);
                var t=$("<a>",{class:'button7'});
                t.text('Добавить в корзину');
                block.append(t);
                if(k>=ui && k<ua)
                    a.append(block);
                else if (k>=ui && k<ub)
                    b.append(block);
                else if(k>=ui && k<uc)
                    c.append(block);
                k++;
            });
            localStorage.poisk=null;
            $("#allin").append(a);
            $("#allin").append(b);
            $("#allin").append(c);
            c=$("<div>",{id:'perebor'});
            if(k%12==0)
                u=k/12;
            else
                u=k/12+1;
            u=Math.floor(u);
            if(u<=4)
                for(var i=1;i<=u;i++)
            {
                a=$("<a>",{class:'button27'}).text(i);
                a.on('click',move);
                c.append(a);
            }
            else if (bc<=2){
                for(var i=1;i<=3;i++)
                {
                    a=$("<a>",{class:'button27'}).text(i);
                    a.on('click',move);
                    c.append(a);
                }
                c.append($("<a>",{class:'button27'}).text('...'));
                a=$("<a>",{class:'button27'}).text(u);
                a.on('click',move);
                c.append(a);
            }
            else if(bc>=u-1){
                a=$("<a>",{class:'button27'}).text(1);
                a.on('click',move);
                c.append(a);
                c.append($("<a>",{class:'button27'}).text('...'));
                for(var i=u-2;i<=u;i++)
                {
                    a=$("<a>",{class:'button27'}).text(i);
                    a.on('click',move);
                    c.append(a);
                }
            }
            else{
                a=$("<a>",{class:'button27'}).text(1);
                a.on('click',move);
                c.append(a);
                c.append($("<a>",{class:'button27'}).text('...'));
                a=$("<a>",{class:'button27'}).text(bc-1);
                a.on('click',move);
                c.append(a);
                a=$("<a>",{class:'button27'}).text(bc);
                a.on('click',move);
                c.append(a);
                a=$("<a>",{class:'button27'}).text(bc+1);
                a.on('click',move);
                c.append(a);
                c.append($("<a>",{class:'button27'}).text('...'));
                a=$("<a>",{class:'button27'}).text(u);
                a.on('click',move);
                c.append(a);
            }
            $("#allin").append(c);
            function move(){
                bc=Number($(this).text());
                ui=(bc-1)*12;
                ua=ui+4;
                ub=ua+4;
                uc=ub+4;
                $(".line").remove();
                $("#perebor").remove();
                $.get("tab/allobj.xml")
                    .done(allobj);
            };
    $(".button7").on("click",function(){
        
        localStorage.rub=Number(localStorage.getItem('rub'))+Number($(this).prev().text().split(' ')[0]);
        $("#sums").text(localStorage.getItem('rub')+localStorage.getItem('kop'));
        localStorage.col++;
        $("#col").text(localStorage.getItem('col'));
        if (Number(localStorage.getItem('col'))==1)
        {
            srca[0]=($(this).parent().find('img').attr('src')).toString();
            localStorage.src = JSON.stringify(srca);
        }   
        else{
            srca= localStorage.src ? JSON.parse(localStorage.src) : [];
            srca[Number(localStorage.getItem('col'))-1]=($(this).parent().find('img').attr('src')).toString();
            localStorage.src = JSON.stringify(srca);
        }
        if (Number(localStorage.getItem('col'))==1)
        {
            costa[0]=Number($(this).prev().text().split(' ')[0]);
            localStorage.cos = JSON.stringify(costa);
        }   
        else{
            costa= localStorage.cos ? JSON.parse(localStorage.cos) : [];
            costa[Number(localStorage.getItem('col'))-1]=Number($(this).prev().text().split(' ')[0]);
            localStorage.cos = JSON.stringify(costa);
        }
        if (Number(localStorage.getItem('col'))==1)
        {
            namea[0]=$(this).parent().find('#nameobj').text();
            localStorage.n = JSON.stringify(namea);
        }   
        else{
            namea= localStorage.n ? JSON.parse(localStorage.n) : [];
            namea[Number(localStorage.getItem('col'))-1]=$(this).parent().find('#nameobj').text();
            localStorage.n = JSON.stringify(namea);
        }
    });
    }; 
  var lp=$("<div>",{class:'lp',id:'op1'});
  lp.attr('data-pos',"0");
  var span=$("<span>").text(0);
  lp.append(span);
  var rp=$("<div>",{class:'rp',id:'op'});
  span=$("<span>").text(maxi);
  rp.append(span);
  rp.attr('data-pos',"1.0");
  var bar=$("<div>",{class:'bar'});
  bar.attr('data-start',"0");
  bar.attr('data-end',maxi.toString());
  bar.append(lp);
  bar.append(rp);
  var pl=$("<div>",{class:'slider'});
  pl.append(bar);
  $("#sort").append(pl);
  var twobombSlider  = (function(){
var drag = false;
var values = []; 
$(".slider").each(function(i,e){
	updateView(e);
});
$(".slider>.bar>.lp,.slider>.bar>.rp").bind("mousedown",function(){
	drag = $(this);
});
$(document).bind("mousemove",function(e){
	if(!drag)
  	return;
   var x = (e.pageX - $(drag).outerWidth()/2 - $(drag).parent().parent().offset().left)/$(drag).parent().parent().outerWidth();
   if(x < 0 ) x = 0;
   if(x > 1) x = 1;
   var rp = $(drag).parent().find(".rp");
   var lp = $(drag).parent().find(".lp");
   if($(drag).hasClass("lp") && x > $(rp).attr("data-pos") ){
   		$(rp).attr("data-pos",x);
   }
   if($(drag).hasClass("rp") && x < $(lp).attr("data-pos") ){
   		$(lp).attr("data-pos",x);
   }
   $(drag).attr("data-pos",x);
   updateView($(drag).parent().parent());
});
$(document).bind("mouseup",function(){
	drag = false;
});
function updateView(slider){
	var startVal = parseInt($(slider).find(".bar").data("start"));
	var endVal = parseInt($(slider).find(".bar").data("end"));
  if(startVal > endVal)
  	endVal = startVal;
	startVal = startVal || 0;
  endVal = endVal || 99999;
  var values = [];
  for(var i = startVal; i <= endVal;i++)
  	values.push(i);
	var l  =$(slider).find(".lp").attr("data-pos");
	var r  =$(slider).find(".rp").attr("data-pos");
  var x = $(slider).outerWidth() * l;
  var w = (r - l)*$(slider).outerWidth();
  $(slider).find(".bar").css({left:x+"px",width:w+"px"});
  var index = Math.round(values.length*l);
  if(index >= values.length)
  	index = values.length-1;
  $(slider).find(".lp").html("<span>"+values[index]+"</span>");
  index = Math.round(values.length*r);
  if(index >= values.length)
  	index = values.length-1;
  $(slider).find(".rp").html("<span>"+values[index]+"</span>");
  }
  })();
  $(".lp").mouseup( mouseUp);
  $(".rp").mouseup( mouseUp);
    function mouseUp() {
    minc=Number($(".lp").first().text());
    maxc=Number($(".rp").first().text());
    $("*.line").remove();
    $("#perebor").remove();
    $.get("tab/allobj.xml")
                      .done(allobj);
  }
});
