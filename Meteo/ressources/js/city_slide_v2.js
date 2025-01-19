$(document).ready(function(){

  const containerTomove = document.querySelector('.city-to-slide') ;
  const show_info_plus=document.querySelector('div.push-type-A.meteo-type.showcontent') ;
  const pre=document.querySelector('#pre') ;
  const next=document.querySelector('#next') ;
  const size=232;
  var output="" ;
  var output_plus="";
  var imgBCK=document.querySelector('#reference') ;
  var local_for_chart=$('.container-item-city.active').attr("data_city")  ;
  let indentifiant=1 ;
  let tab=[] ;
  let counter=0 ;
  let tabId=[] ;
  let tabContent=[] ;
  /***************REPERE****************/
  checktimline() ;
  function checktimline(){
    indentifiant=1 ;
    $('.wind-container.temp').empty() ;
    $('.city-to-slide').empty() ;
    
    var url="https://www.orange.mg/api/pratique/meteo/locations" ;
    let list_city="";
    let x=0 ;
    $.get(url).done(function(data_check_line){
        data_check_line.sort() ;
        for (var i = 0; i <data_check_line.length ; i++){
                if (list_city=="") {
                  list_city=data_check_line[i] ;
                }
                else {
                     tab=list_city.split(":")
                    var test=0 ;
                    for (var j = 0; j < tab.length; j++) {
                      if (tab[j].toLowerCase()==data_check_line[i].toLowerCase()) {
                        test=1;
                        j=tab.length ;
                      }
                    }
                    if (test==0) {
                        list_city+=':'+data_check_line[i] ;
                        var url_list="https://www.orange.mg/api/pratique/meteo/"+jsUcfirst(data_check_line[i]) ;
                        if (i==0) {
                          getInfoCity(url_list,0,data_check_line.length,jsUcfirst(data_check_line[i]),i) ;
                        }
                        else if (i==data_check_line.length) {
                          getInfoCity(url_list,data_check_line.length,data_check_line.length,jsUcfirst(data_check_line[0]),i) ;
                        }
                        else{
                          getInfoCity(url_list,1,data_check_line.length,jsUcfirst(data_check_line[i]),i) ;//.replace(/\s/g, '')
                        }
                    }
                }
          }
      }) ;
  }
  function getInfoCity(url,test,size,location,id){

    var container_meteo=document.querySelector('.containerForSlide') ;
    var today = new Date();
    var min="";

    var url_extra_donne='https://www.orange.mg/api/pratique/meteo/forecast/'+encodeURI((exception(location)));
    //console.log(url_extra_donne+' '+exception(location)) ;
    var x=String(today.getMinutes());
    if (x.length==1) {
        min="0"+x ;
    }
    else {
      min=today.getMinutes() ;
    }
    var time = today.getHours()+":"+min;
    $.get(url_extra_donne).done(function(data_extra){
      var temp=Math.round(tempPredicat(data_extra.list[0].dt_txt.substring(11).split(':')[0],data_extra.list[0].main.temp.toFixed(2),data_extra.list[1].main.temp.toFixed(2),data_extra.list[2].main.temp.toFixed(2)));
      $.get(url).done(function(data_getInfoCity){
        if (data_getInfoCity.forecasts[0].descripton != undefined){
          var weather="" ;
          switch (data_getInfoCity.forecasts[0].descripton){
            case 'ciel dégagé':
              weather="wi-day-sunny";
              break;
            case 'partiellement nuageux':
              weather="wi-day-cloudy-high";
              break;
            case 'nuageux':
              weather="wi-cloudy";
              break;
            case 'légère pluie':
              weather="wi-day-showers";
              break;
            case 'peu nuageux':
              weather="wi-cloud";
              break;
            case 'couvert':
              weather="wi-cloudy";
              break;
            case 'forte pluie':
              weather="wi-day-sleet-storm";
              break;
            default:weather="wi-day-cloudy-gusts";
          }
            indentifiant++;
            tabId.push(data_getInfoCity.cityName) ;
            tabContent.push('<div class="container-item-city" data_city="'+data_getInfoCity.cityName+'" data_id="" >'+
                '<div class="img-city-page">'+
                    '<div id="hexagon" style="background-image: url(/madagascar_pages/uploads/1/img/'+exception(data_getInfoCity.cityName).replace(/\s/g, '')+'.jpg);">'+
                    '</div>'+
                '</div>'+
                '<div class="short-desc-page">'+
                  '<h1 style="color:#FFFFFF; font-weight:300;font-size:18px;">'+data_getInfoCity.cityName+'</h1>'+
                  '<p style="color:#FF7900;font-size:13px; ">'+data_extra.list[0].weather[0].description+'</p>'+
                  '<p style="font-weight:400;font-size:27px;color:#FFFFFF;margin-top:10px ;">'+temp+'°C</p>'+
                '</div>'+
              '</div>');
        }
        // IDEA: there are many cities which are duplicated and may need to be erased from the api (4 data F-d=>Dauphin & N-be/BE=>Be)
        //console.log(size+'='+((tabContent.length+1)+(size-tab.length))+' '+id)
        if (size==(tabContent.length+1)+(size-tab.length)) {
           tabId.sort();
           for (var x = 0; x < tabId.length; x++) {
             var regex = RegExp(tabId[x]);
             for (var y = 0; y < tabContent.length; y++) {
               if (regex.test(tabContent[y])){
                 output+=tabContent[y] ;
               }
             }
           }
          containerTomove.innerHTML+=output ;
          const list=document.querySelectorAll('.container-item-city') ;
          var inc=1 ;
          [].forEach.call(list,function(div){
              div.setAttribute("data_id",inc);
              inc++ ;
          });
          chargeSlide();
        }
      });
    })

  }
  /***************REPERE****************/

function chargeSlide(){
    let cityItem = document.querySelectorAll('.container-item-city') ;
    counter= Math.round((cityItem.length / 2));
    $(".container-item-city").removeClass('active');
    $(".container-item-city").removeClass('reduced-1');
    $(".container-item-city").removeClass('reduced-2-right');
    $(".container-item-city").removeClass('reduced-2-left');
    cityItem[counter].classList.add("active") ;
    if (cityItem[counter+1]!=undefined ) {
      cityItem[counter+1].classList.add("reduced-1") ;
    }
    if (cityItem[counter+2]!=undefined ) {
      cityItem[counter+2].classList.add("reduced-2-right") ;
    }
    if (cityItem[counter-1]!=undefined ) {
      cityItem[counter-1].classList.add("reduced-1") ;
    }
    if (cityItem[counter-2]!=undefined ) {
      cityItem[counter-2].classList.add("reduced-2-left") ;
    }
    containerTomove.style.transform='translateX('+(-(size) * counter)+'px)' ;
    var local=$('.container-item-city.active').attr("data_city") ;
    chargeInfoPlus(local) ;
    realTImeDataMeteo(local) ;
    next.addEventListener('click',()=>{
      if (counter==cityItem.length-1){
        counter=0;
        containerTomove.style.transition='transform 0.4s ease-in-out' ;
        containerTomove.style.transform='translateX('+(-(size) * counter)+'px)' ;
      }
      else {
        counter++ ;
        containerTomove.style.transition='transform 0.4s ease-in-out' ;
        containerTomove.style.transform='translateX('+(-(size) * counter)+'px)' ;
      }
      $(".container-item-city").removeClass('active');
      $(".container-item-city").removeClass('reduced-1');
      $(".container-item-city").removeClass('reduced-2-right');
      $(".container-item-city").removeClass('reduced-2-left');
      cityItem[counter].classList.add("active") ;

      if (counter+1<=cityItem.length && cityItem[counter+1]!=undefined ) {
          cityItem[counter+1].classList.add("reduced-1") ;
      }
      if (counter+2<=cityItem.length  && cityItem[counter+2]!=undefined ) {
          cityItem[counter+2].classList.add("reduced-2-right") ;
      }
      if (counter-1>=0  && cityItem[counter-1]!=undefined ) {
          cityItem[counter-1].classList.add("reduced-1") ;
      }
      if (counter-2>=0  && cityItem[counter-2]!=undefined ) {
          cityItem[counter-2].classList.add("reduced-2-left") ;
      }
      var local=$('.container-item-city.active').attr("data_city") ;
      chargeInfoPlus(local) ;
      realTImeDataMeteo(local) ;
    })
    pre.addEventListener('click',()=>{
      if (counter==0) {
        counter=cityItem.length-1 ;
        containerTomove.style.transition='transform 0.4s ease-in-out' ;
        containerTomove.style.transform='translateX('+((-size) * counter)+'px)' ;
      }
      else {
        counter-- ;
        containerTomove.style.transition='transform 0.4s ease-in-out' ;
        containerTomove.style.transform='translateX('+(+(-size) * counter)+'px)' ;
      }
      $(".container-item-city").removeClass('active');
      $(".container-item-city").removeClass('reduced-1');
      $(".container-item-city").removeClass('reduced-2-right');
      $(".container-item-city").removeClass('reduced-2-left');
      cityItem[counter].classList.add("active") ;
      if (counter+1<=cityItem.length && cityItem[counter+1]!=undefined ) {
          cityItem[counter+1].classList.add("reduced-1") ;
      }
      if (counter+2<=cityItem.length  && cityItem[counter+2]!=undefined ) {
          cityItem[counter+2].classList.add("reduced-2-right") ;
      }
      if (counter-1>=0  && cityItem[counter-1]!=undefined ) {
          cityItem[counter-1].classList.add("reduced-1") ;
      }
      if (counter-2>=0  && cityItem[counter-2]!=undefined ) {
          cityItem[counter-2].classList.add("reduced-2-left") ;
      }
      var local=$('.container-item-city.active').attr("data_city") ;
      chargeInfoPlus(local) ;
      realTImeDataMeteo(local) ;
    })
  }
/*********Event listener for data_city**********/
function chargeInfoPlus(location){
      var url_info_plus="https://www.orange.mg/api/pratique/meteo/"+encodeURI(exception(location)) ;
      var today = new Date();
      var min="" ;
      var jSuivantsAfch="" ;
      if (String(today.getMinutes()).length==1) {
          min="0"+today.getMinutes() ;
      }
      else {
        min=today.getMinutes() ;
      }
      var time = today.getHours()+":"+min;
      var url_for_aside='https://www.orange.mg/api/pratique/meteo/forecast/'+encodeURI((exception(location)));
      //console.log('1: '+url_for_aside+' '+exception(location)) ;
      $.get(url_for_aside).done(function(data_for_aside){
        var weather=data_for_aside.list[0].weather[0].description;
        $.get(url_info_plus).done(function(data_info_plus){
          var date=data_info_plus.forecasts[0].date.split(' ') ;
          for (var i = 0; i < data_info_plus.forecasts.length; i++) {
            if (data_info_plus.forecasts[i].descripton != undefined && data_info_plus.forecasts[0].date!=data_info_plus.forecasts[i].date ){
              switch (data_info_plus.forecasts[i].descripton){
                case 'ciel dégagé':
                  weather="wi-day-sunny";
                  break;
                case 'partiellement nuageux':
                  weather="wi-day-cloudy-high";
                  break;
                case 'nuageux':
                  weather="wi-cloudy";
                  break;
                case 'légère pluie':
                  weather="wi-day-showers";
                  break;
                case 'peu nuageux':
                  weather="wi-cloud";
                  break;
                case 'couvert':
                  weather="wi-cloudy";
                  break;
                case 'forte pluie':
                  weather="wi-day-sleet-storm";
                  break;
                default:weather="wi-day-cloudy-gusts";
              }
              var x=String(Math.round(data_info_plus.forecasts[i].minTc));
              var y=String(Math.round(data_info_plus.forecasts[i].maxTc)) ;
              if (x.length==1) {
                  x="0"+x ;
              }
              if (y.length==1) {
                  y="0"+y ;
              }

              var date_proche=data_info_plus.forecasts[i].date.split(' ') ;
                jSuivantsAfch+='<div class="day-info">'+
                    '<div class="day">'+date_proche[0]+
                    '</div>'+
                    '<div class="tmp-and-weather">'+
                      '<div class="tmp-pD">'+x+'-'+y+
                      '°C<div class="icon-weather-pD" style="background-image: url(/madagascar_pages/uploads/1/img/'+weather+'.svg)">'+
                      '</div>'+
                      '</div>'+
                    '</div>'+
                '</div>' ;
            }
          }
          var date=data_info_plus.forecasts[0].date.split(' ');
          if (data_info_plus.forecasts[0].descripton != undefined){
            var next=data_for_aside.list[0].dt_txt.split(' ');
            var weather_aside="" ;
            var hour=next[1].split(':') ;

            if (hour[0]>=18 || hour[0]<6){
              switch (data_for_aside.list[0].weather[0].description){
                case 'ciel dégagé':
                  weather_aside="wi-night-clear";
                  break;
                case 'partiellement nuageux':
                  weather_aside="wi-night-alt-partly-cloudy";
                  break;
                case 'nuageux':
                  weather_aside="wi-cloudy";
                  break;
                case 'légère pluie':
                  weather_aside="wi-night-alt-sprinkle";
                  break;
                case 'peu nuageux':
                  weather_aside="wi-night-alt-partly-cloudy";
                  break;
                case 'couvert':
                  weather_aside="wi-cloudy";
                  break;
                case 'forte pluie':
                  weather_aside="wi-night-alt-sleet-storm";
                  break;
                default:weather_aside="wi-night-alt-cloudy-high";
              }
            }
            else {
              switch (data_for_aside.list[0].weather[0].description){
                case 'ciel dégagé':
                  weather_aside="wi-day-sunny";
                  break;
                case 'partiellement nuageux':
                  weather_aside="wi-day-cloudy-high";
                  break;
                case 'nuageux':
                  weather_aside="wi-cloudy";
                  break;
                case 'légère pluie':
                  weather_aside="wi-day-showers";
                  break;
                case 'peu nuageux':
                  weather_aside="wi-cloud";
                  break;
                case 'couvert':
                  weather_aside="wi-cloudy";
                  break;
                case 'forte pluie':
                  weather_aside="wi-day-sleet-storm";
                  break;
                default:weather_aside="wi-day-cloudy-gusts";
              }
            }
            output_plus='<div class="header-weather">'+
              '<h1>'+data_info_plus.cityName+'</h1>'+
              '<p >'+time+'</p>'+
              '<p style="font-weight:400">'+date[1]+' '+date[2]+'</p>'+
              '<p style="font-weight:400 ;color:#A885D8 ;">'+date[0]+'</p>'+
            '</div>'+
            '<div class="weather-container" style="padding:10px ;">'+
                  '<div class="first-section"><div class="icon-weather" style="background-image: url(/madagascar_pages/uploads/1/img/'+weather_aside+'.svg); "></div><div style="font-weight:bold ;">'+data_for_aside.list[0].weather[0].description+'</div>'+
                  '</div>'+
                  '<p style="font-size:30px ;padding:5px ;font-weight:500; color:black ;">'+tempPredicat(data_for_aside.list[0].dt_txt.substring(11).split(':')[0],data_for_aside.list[0].main.temp.toFixed(2),data_for_aside.list[1].main.temp.toFixed(2),data_for_aside.list[2].main.temp.toFixed(2))+'°C</p>'+
            '</div>'+
            '<div class="per-day">'
                +jSuivantsAfch+
              '</div>';
          }
          show_info_plus.innerHTML=output_plus ;
        });
      })

    }
function tempPredicat(h,t_now,t_later,t_laterP1){
          var d = new Date();

          if (h<d.getUTCHours()+3) {
            var a=parseFloat(t_later) ;//temperture A
            var b=parseFloat(t_laterP1) ;//temperture B
            var hdeb=parseInt(d.getUTCHours()+3) ;
          }
          else if(h==d.getUTCHours()+3) {
            var a=parseFloat(t_now) ;//temperture A
            var b=parseFloat(t_later) ;//temperture B
            var hdeb=parseInt(h) ;
          }

          var hdeb1=hdeb+1 ;
          var hdeb2=hdeb+2 ;
          var hlim=hdeb+3 ;

          var minref


          var hour = parseInt(d.getHours());//10
          var min = parseInt(d.getUTCMinutes());

          if ((hdeb+1)>hour) {
            minref=0 ;
          }
          if ((hdeb+1)<=hour && (hdeb+2)>hour ) {
            minref=1 ;
          }
          if ((hdeb+2)<=hour && (hdeb+3)>hour) {
            minref=2 ;
          }

          var totalmin=180 ;//=interval ;
          var minNow=(minref*60)+min ;//0-1-2


          if (a<b) {
            var interval=b-a ;
            var addTotemp=(interval*minNow)/180 ;
            a=a+addTotemp ;
          }
          if (a>b) {
            var interval=a-b ;
            var addTotemp=(interval*minNow)/180 ;
            a=a-addTotemp ;
          }
          return Math.round(a) ;
    }
$('.city-to-slide').on('click','.container-item-city',function(){
    var local=$(this).attr("data_city")  ;
    slideOnClick($(this).attr("data_id")) ;
    chargeInfoPlus(local) ;
    realTImeDataMeteo(local) ;
})
/*********Event listener for data_city**********/
/*********slide on click**********/
function slideOnClick(x) {
  counter=parseInt(x)-1 ;
  let cityItem = document.querySelectorAll('.container-item-city') ;
  $(".container-item-city").removeClass('active');
  $(".container-item-city").removeClass('reduced-1');
  $(".container-item-city").removeClass('reduced-2-right');
  $(".container-item-city").removeClass('reduced-2-left');
  cityItem[counter].classList.add("active") ;
  if (counter+1<=cityItem.length && cityItem[counter+1]!=undefined ) {
      cityItem[counter+1].classList.add("reduced-1") ;
  }
  if (counter+2<=cityItem.length  && cityItem[counter+2]!=undefined ) {
      cityItem[counter+2].classList.add("reduced-2-right") ;
  }
  if (counter-1>=0  && cityItem[counter-1]!=undefined ) {
      cityItem[counter-1].classList.add("reduced-1") ;
  }
  if (counter-2>=0  && cityItem[counter-2]!=undefined ) {
      cityItem[counter-2].classList.add("reduced-2-left") ;
  }
  containerTomove.style.transition='transform 0.4s ease-in-out' ;
  containerTomove.style.transform='translateX('+(-(size) * counter)+'px)' ;

}
/*********slide on click**********/
function jsUcfirst(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}
/*********load icon city function**********/
function loadIconCIty(location){
  var name=location ;
  switch (name){
    case 'ciel dégagé':
      weather="wi-day-sunny";
      break;
    case 'partiellement nuageux':
      weather="wi-day-cloudy-high";
      break;
    case 'nuageux':
      weather="wi-cloudy";
      break;
    case 'légère pluie':
      weather="wi-day-showers";
      break;
    case 'peu nuageux':
      weather="wi-cloud";
      break;
    case 'couvert':
      weather="wi-cloudy";
      break;
    case 'forte pluie':
      weather="wi-day-sleet-storm";
      break;
    default:weather="wi-day-cloudy-gusts";
  }
  return name ;
}
/*****************chart ********************/



function realTImeDataMeteo(local){
  $('#weather-chart').remove();
  $('.wind-container.Humidity').empty();
  $('#graph-container').append('<canvas id="weather-chart"><canvas>');
  var ctx = document.getElementById('weather-chart').getContext('2d');
  var humidity_container=document.querySelector('.wind-container.Humidity') ;
  var url_extra_donne='https://www.orange.mg/api/pratique/meteo/forecast/'+encodeURI(exception(local));
  var icon_meteo_container=document.querySelector('.wind-container.temp') ;
  var icon_meteo_container_COntent="" ;
  var hour_for_shart="" ;
  var data_temp_chart="" ;
  var gradient = ctx.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, 'rgba(255,121,0,1)');
  gradient.addColorStop(1, 'rgba(255,102,0,0)');

  $.get(url_extra_donne).done(function(data_extra){

      var date=data_extra.list[0].dt_txt.split(' ');

      for (var i = 0; i < data_extra.list.length; i++) {

        var next=data_extra.list[i].dt_txt.split(' ');
        var weather="" ;
        var hour=next[1].split(':') ;
        var temp=data_extra.list[i].main.temp;

        if (hour[0]>=18 || hour[0]<6){
          switch (data_extra.list[i].weather[0].description){
            case 'ciel dégagé':
              weather="wi-night-clear";
              break;
            case 'partiellement nuageux':
              weather="wi-night-alt-partly-cloudy";
              break;
            case 'nuageux':
              weather="wi-cloudy";
              break;
            case 'légère pluie':
              weather="wi-night-alt-sprinkle";
              break;
            case 'peu nuageux':
              weather="wi-night-alt-partly-cloudy";
              break;
            case 'couvert':
              weather="wi-cloudy";
              break;
            case 'forte pluie':
              weather="wi-night-alt-sleet-storm";
              break;
            default:weather="wi-night-alt-cloudy-high";
          }
        }
        else {
          switch (data_extra.list[i].weather[0].description){
            case 'ciel dégagé':
              weather="wi-day-sunny";
              break;
            case 'partiellement nuageux':
              weather="wi-day-cloudy-high";
              break;
            case 'nuageux':
              weather="wi-cloudy";
              break;
            case 'légère pluie':
              weather="wi-day-showers";
              break;
            case 'peu nuageux':
              weather="wi-cloud";
              break;
            case 'couvert':
              weather="wi-cloudy";
              break;
            case 'forte pluie':
              weather="wi-day-sleet-storm";
              break;
            default:weather="wi-day-cloudy-gusts";
          }
        }

          if (next[0]==date[0]){

            if (data_extra.list[i].dt_txt.split(' ')[0]!=data_extra.list[i+1].dt_txt.split(' ')[0]) {
              hour_for_shart+=hour[0]+',00';
              data_temp_chart+=temp+','+data_extra.list[i+1].main.temp ;
              icon_meteo_container_COntent+='<div class="weather-container-per-hour">'+
                                              '<div class="icon-weather-per-hour" style="background-image: url(/madagascar_pages/uploads/1/img/'+weather+'.svg)"></div>'+
                                            '</div>';
            }
            else{
              hour_for_shart+=hour[0]+',' ;
              data_temp_chart+=temp+',' ;
              icon_meteo_container_COntent+='<div class="weather-container-per-hour">'+
                                              '<div class="icon-weather-per-hour" style="background-image: url(/madagascar_pages/uploads/1/img/'+weather+'.svg)"></div>'+
                                            '</div>';
            }
          }
      }

      var x=hour_for_shart.split(",");
      var donne=data_temp_chart.split(",") ;
      window.myLine = new Chart(ctx,{
        type:'line',
        data: {
          //creation label axe
          labels: x,
          //dataset properties
          datasets:[{
            label: 'temperature',
            fill: true,
            backgroundColor: gradient,
            borderColor: '#085EBD',
            data:donne,
          }/*donnee volohany*/]
        },//fin data
        options:{
          responsive: true,
          title: {
            display: false,
            text: 'Chart.js Line Chart'
          },
          tooltips: {
            mode: 'index',
            intersect: true,
          },
          legend: {
             display: false
          },
          hover: {
            mode: 'nearest',
            intersect: false
          },
          scales: {
            xAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'heure'
              }
            }],
            yAxes: [{
              display: true,
              scaleLabel: {
                display: false,
                labelString: 'temperature'
              }
            }],

          }
        },//fin option
      });
      icon_meteo_container.innerHTML=icon_meteo_container_COntent ;
      var plus='<p>Humidité: '+data_extra.list[0].main.humidity+'%</p>'+
      '<p>Vitesse du vent : '+data_extra.list[0].wind.speed+' m/s</p>' ;
      humidity_container.innerHTML=plus;
      resizing(x.length);
  });
}
function resizing(nbrChild){
    var humidity_container=document.querySelector('.wind-container.Humidity') ;
    var windowCanvas=document.querySelector('#weather-chart') ;
    var windContainer=document.querySelector('.wind-container') ;
    var miniWther=document.querySelectorAll('.weather-container-per-hour'),i ;
    var sizeCanvas=windowCanvas.clientWidth;
    var childWidth=((sizeCanvas)/(nbrChild-1));
    var childPrcent=((childWidth*100)/sizeCanvas) ;
    humidity_container.style.width=sizeCanvas ;
    for (i = 0; i < miniWther.length; ++i) {
        miniWther[i].style.width = childPrcent+'%';
    }
}

function exception(location){
  switch (location) {
    case "Tuléar":
      return "Toliara";
      break;
    case "Nosy BE":
      return "Nosy be";
      break;
    case "Tôlanaro":
      return "Fort Dauphin";
      break;
    case "Nosy Be":
      return "Nosy be";
      break;
    case "Diégo-Suarez":
      return "Antsiranana";
    default: return location ;

  }
}
})
