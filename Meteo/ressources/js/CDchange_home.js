$(document).ready(function(){
  var forDevise=document.querySelector('.forDevise') ;
  var url="https://www.orange.mg/api/devises" ;
  console.log('CD_change_home');
  var output_list='';
   $.get(url).done(function(data){
     for (var i = 0; i < data.length; i++){
        output_list+='<li>'+
         '<div style="display:flex"><div class="devise_icon_home"  style="background-image: url(images/CD_change/'+data[i].name+'.svg);"></div>'+data[i].fullName+' ('+data[i].name+')</div>'+data[i].value+' Ar';
        if(i>2){
          i=data.length ;
        }
     }
    forDevise.innerHTML=output_list ;
   })
})
