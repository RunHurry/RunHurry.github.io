var q;
$(document).ready(
     function(){
         if (localStorage.getItem('rub') === null)
         {
             localStorage.setItem('rub', "0");
             localStorage.setItem('kop', ",00p.");
             localStorage.setItem('col', "0");
             localStorage.setItem('src', null);
        }
         $("#sums").text(localStorage.getItem('rub')+localStorage.getItem('kop'));
         $("#col").text(localStorage.getItem('col'));
         q=false;
        $("#swipe").click(function(){
            if(!q)
              $( "#stors" ).animate({ "left": "+=300px" }, "slow" );
            else
               $( "#stors" ).animate({ "left": "-=300px" }, "slow" );
           q=!q;});
           localStorage.poisk=null;
   }
);

