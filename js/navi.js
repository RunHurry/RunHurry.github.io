$(document).ready(function(){
    $("#searcmain").on('submit', function(e) {
           localStorage.setItem('poisk',$("#searc").val() );
           location.href = 'all.html';
           return false;
});
    $("#allt").on("click",
         function(){
        if(localStorage.getItem('type') === null)
             localStorage.setItem('type', "all");
         else
             localStorage.type="all";
         }
    );
 $("#comp").on("click",
         function(){
        if(localStorage.getItem('type') === null)
             localStorage.setItem('type', "comp");
         else
             localStorage.type="comp";
         }
    );
    $("#smart").on("click",
         function(){
        if(localStorage.getItem('type') === null)
             localStorage.setItem('type', "smart");
         else
             localStorage.type="smart";
         }
    );
    $("#dom").on("click",
         function(){
        if(localStorage.getItem('type') === null)
             localStorage.setItem('type', "dom");
         else
             localStorage.type="dom";
         }
    );
    $("#kitc").on("click",
         function(){
        if(localStorage.getItem('type') === null)
             localStorage.setItem('type', "kitc");
         else
             localStorage.type="kitc";
         }
    );
    $("#play").on("click",
         function(){
        if(localStorage.getItem('type') === null)
             localStorage.setItem('type', "play");
         else
             localStorage.type="play";
         }
    );
    $(".lo").on("click",
         function(){
            location.href = 'index.html';
         }
    );
});
    