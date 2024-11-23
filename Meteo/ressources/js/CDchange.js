$(document).ready(function(){
  var btn_bott_exchange=document.querySelector('.current_devise.bott') ;
  var list_exchange=document.querySelector('.list_devise_exchange') ;
  const txtAbr=document.querySelector('.insert_change.Abr') ;
  const txtAr=document.querySelector('.insert_change.Ariary') ;
  const ongletHisto=document.querySelectorAll('.onglet.historique') ;
  const ongletDetail=document.querySelectorAll('.onglet.details') ;
  const tooltipEl = document.getElementById('chartjs-tooltip');
  let lasttxt_top="" ;
  let lasttxt_bot="" ;
  let cour_de_change=0 ;
  var dateVl=document.querySelector('.valueMonth') ;
  var dataName='USD' ;
  const gtitre=document.querySelector('.Gtitre') ;
  /***********************for filter***************/
  let listdate='';
  let listvalue='';
  let last_i=0 ;
  /***********************for filter***************/
  /*****************instance devise*******************/
  let euro=0;
  let usd=0;
  /************************************/
  var ctx = document.getElementById('chart').getContext('2d');
  let chartjs='' ;
  var gradient = ctx.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, 'rgba(255,121,0,1)');
  gradient.addColorStop(1, 'rgba(255,102,0,0)');

  const listDev=document.querySelector('.listCourChange') ;
  const list_deroulante=document.querySelector('.list_devise_exchange') ;
  const list_deroulante_active=document.querySelector('.list_devise_exchange')
  const default_devise=document.querySelector('.label_devise_exchange.target_click.dflt') ;
  /*********************load data devise *****************************/
  load_data() ;
  filterData("USD") ;
  function load_data(){
    var output_list='' ;
    var listClc='' ;
    var dflExchange='' ;
     var url="https://www.orange.mg/api/devises" ;
      $.get(url).done(function(data){
        ////console.log(data);

        for (var i = 0; i < data.length; i++){
          var list='' ;
            setDevise(data[i].name,data[i].value) ;


            ////console.log("el :"+data[i].mids['2019-07-31']) ;
            $.each(data[i].mids, function(j, item){
                list+=' '+j ;
                //alert('ato') ;
            });
            console.log('itoooo :'+ list) ;
            var test=1;
            var temp=0;
            var tab=list.split(' ') ;
            console.log(tab) ;
            while (test!=0){
              test=0 ;
              for (var j = 0; j < tab.length; j++) {
                if (Date.parse(tab[j])>Date.parse(tab[j+1])) {
                    test=1 ;
                    temp=tab[j] ;
                    tab[j]=tab[j+1] ;
                    tab[j+1]=temp ;
                }
              //  console.log(i+":"+tab) ;
              }
            }
            var signe=(data[i].mids[tab[tab.length-2]]-data[i].value )>0?'-':'+';
            if (data[i].mids[tab[tab.length-2]]-data[i].value >0) {
              var arrow='down_right' ;
            }
            if (data[i].mids[tab[tab.length-2]]-data[i].value <0) {
              var arrow='up_right'
            }
            if (data[i].mids[tab[tab.length-2]]-data[i].value==0) {
              var arrow='unchanged' ;
            }
            var prc=Math.abs(((data[i].mids[tab[tab.length-2]]-data[i].value)*100)/data[i].value) ;
            var valeur=data[i].mids[tab[tab.length-2]]-data[i].value ;
            var color=valeur>0?'green':'red' ;
            var prtage=signe.concat(prc.toFixed(3).toString()) ;
            //alert(signe) ;
          if(i==0){
            cour_de_change=data[i].value ;
            $('.target_click.dflt').attr('dataName',data[i].name) ;
             default_devise.innerHTML=data[i].fullName+'<div class="current_devise bott" style="background-image: url(images/CD_change/'+load_apropriate_icon(data[i].name)+'.svg);" >'+
                                      '</div>' ;
          }
          output_list+='<div class="devise_container" dataNumber='+i+'>'+
              '<div class="label_devise" >'+
                  '<p style="font-size:18px;">'+data[i].fullName+'</p>'+
                  '<p class="valeur euro" style="font-size:32px;">'+data[i].value+'</p>'+
                  '<p class="percent" style="width:100% ;position: relative;display: inline;font-size:13px;font-stretch: ultra-condensed;padding:2px ;color:'+color+' ;">'+signe.concat(Math.abs(valeur.toFixed(3)))+'('+prtage+' %)<div class="arrow-container state_icon '+arrow+'" ></div></p>'+
              '</div>'+
              '<div class="icon_devise" style="background-image: url(images/CD_change/'+load_apropriate_icon(data[i].name)+'.svg);">'+

            '</div>'+
          '</div>';
          listClc+='<div class="label_devise_exchange forlist" style="position:relative ;" dataName="'+data[i].name+'">'+
              data[i].fullName
              +'<div class="current_devise" style="background-image: url(images/CD_change/'+load_apropriate_icon(data[i].name)+'.svg);">'+

              '</div>'+
          '</div>' ;
        }


        listDev.innerHTML=output_list;
        list_deroulante.innerHTML=listClc ;
      })
  }
  function load_apropriate_icon(x){
    switch (x) {
      case 'USD':
            return 'USD' ;
        break;
      case 'EUR':
            return 'EUR' ;
        break;
      default:
    }
  }
  /**********************load data devie****************************/
  $(document).on('click','.forlist',()=>{
    $(".list_devise_exchange").toggleClass('active') ;
    $(".underline_deco.sup").toggleClass('active') ;
  })
  $(document).on('click','.current_devise.bott',()=>{
    $(".list_devise_exchange").toggleClass('active') ;
    $(".underline_deco.sup").toggleClass('active') ;
  })

  $('.insert_change.Ariary').on('focus',function(){
    ////console.log(exchange) ;
    var inter=setInterval(load_BOTT,0) ;
    $('.insert_change.Ariary').on('focusout',function(){
      clearInterval(inter) ;
    })
  })
  $('.insert_change.Abr').on('focus',function(){
    var inter=setInterval(load_TOP,0) ;
    $('.insert_change.Abr').on('focusout',function(){
      clearInterval(inter) ;
    })
  })

  function load_BOTT(){
    var exchange=calcul_cour() ;
    var txt=$('.insert_change.Ariary').val() ;
    ////console.log(txt) ;
    if (lasttxt_top!=txt && txt!="" && txt!="NaN" ) {
      lasttxt_top=txt ;
      var res=(parseFloat(txt)/exchange).toFixed(2) ;
      if (res=="NaN" ){
        txtAbr.value=0 ;
      }
      else {
        txtAbr.value=res ;
      }
    }
  }
  function load_TOP(){
    var exchange=calcul_cour() ;
    var txt=$('.insert_change.Abr').val() ;
    if (lasttxt_top!=txt  && txt!="" && txt!="NaN") {
        lasttxt_top=txt ;
        var res=(parseFloat(txt)*exchange).toFixed(2) ;
        if (res=="NaN" ){
          txtAr.value=1 ;
        }
        else {
          txtAr.value=res ;
        }
    }
  }
  function calcul_cour(){
    var dev=document.querySelector(".target_click.dflt") ;
    var dev_calcul=$(".target_click.dflt").attr('dataName') ;
    var url="https://www.orange.mg/api/devises" ;
    cour_de_change= getDevise(dev_calcul) ;
    ////console.log('now :'+cour_de_change) ;
    return cour_de_change ;
  }
  $('.underline_deco.inside').on('click','.label_devise_exchange',function(){

    var changeTo=$(this).attr('dataName') ;
    var url="https://www.orange.mg/api/devises" ;
    $.get(url).done(function(data){
      for (var i = 0; i < data.length; i++){
        ////console.log(data[i].name);
        if (data[i].name==changeTo){
          $('.target_click.dflt').attr('dataName',data[i].name) ;
          default_devise.innerHTML=data[i].fullName+'<div class="current_devise bott" style="background-image: url(images/CD_change/'+load_apropriate_icon(data[i].name)+'.svg); " >'+
                                   '</div>' ;
         cour_de_change=data[i].value ;
         txtAr.value=parseFloat(txt)*cour_de_change ;
        }
      }
    })
  })
  function setDevise(x, value){
    switch (x) {
      case 'EUR':
        euro=value ;
        ////console.log(euro) ;
        break;
      case 'USD':
        usd=value ;
        ////console.log(usd) ;
        break;
      default:
    }
  }
  function  getDevise(name) {
      switch (name) {
        case 'EUR':
          return euro ;
          break;
        case 'USD':
          return usd ;
          break;
        default:
      }
  }
  function  getMonthString(nbr) {
      switch (nbr) {
        case 1:
          return "Janvier" ;
          break;
        case 2:
          return 'Fevrier' ;
          break;

        case 3:
          return "Mars" ;
          break;
        case 4:
          return "Avril" ;
          break;
        case 5:
            return "Mai" ;
            break;
        case 6:
            return "Juin" ;
            break;
        case 7:
            return "Juillet" ;
            break;
        case 8:
            return "Aout" ;
            break;
        case 9:
            return "Septembre" ;
            break;
        case 10:
            return "Octobre" ;
            break;
        case 11:
            return "Novembre" ;
            break;
        case 12:
            return "Decembre" ;
            break;
        default:

      }
  }
  $('.onglet.historique').on('click',()=>{
    $('.onglet.details').removeClass('active') ;
    $('.onglet.historique').addClass('active');
    $('.graph-container').removeClass('hide') ;
    $('.details-container').addClass('hide') ;
  }) ;
  $('.onglet.details').on('click',()=>{
    $('.onglet.historique').removeClass('active') ;
    $('.onglet.details').addClass('active');
    $('.details-container').removeClass('hide') ;
    $('.graph-container').addClass('hide') ;
  }) ;
/*******************************filter*********************************/
//filterData("USD") ;


function filterData(name){
   var url="https://www.orange.mg/api/devises";
   $.holdReady(true);
    $.get(url).done(function(data){
      var list='' ;
      for (var i = 0; i < data.length; i++) {
      if (data[i].name==name) {
        ////console.log("el :"+data[i].mids['2019-07-31']) ;
        $.each(data[i].mids, function(j, item){
            list+=' '+j ;
        });
      }
      }
      //console.log("name filter data:"+list) ;
      return filter(list,name) ;
    })
    $.holdReady(false);
}
function filter(list,name){
  console.log(list+" filter")
  var test=1;
  var temp=0;
  var tab=list.split(' ') ;
  ////console.log(tab) ;
  while (test!=0){
    test=0 ;
    for (var i = 0; i < tab.length; i++) {
      if (Date.parse(tab[i])>Date.parse(tab[i+1])) {
          test=1 ;
          temp=tab[i] ;
          tab[i]=tab[i+1] ;
          tab[i+1]=temp ;
      }
      ////console.log(i+":"+tab) ;
    }
  }
  forChart(tab,name) ;
  //console.log("tableau :" +tab);
}
/*******************************filter*********************************/
/********************************/
    $('.push-type-A.meteo-type.listCourChange').on('click','.devise_container',function(){
        $('#chart').remove();
        $('#canvas-holder1').append('<canvas id="chart"></canvas>');
        var x=$(this).attr('datanumber') ;
        var url="https://www.orange.mg/api/devises";
        $.get(url).done(function(data){
         //console.log("eto :"+data[x].name) ;
         if (chartjs!=''){
         }
         filterData(data[x].name) ;
         dataName =data[x].name ;
         //alert(dataName) ;
        })

    })
/********************************/
$('.periode').on('click',function(){
  //alert(dataName) ;
  $('.periode').removeClass('selected');
  $(this).addClass('selected') ;
  //console.log("testttt:"+$('.periode.selected').attr('data-j')) ;
  $('#chart').remove();
  $('#canvas-holder1').append('<canvas id="chart"></canvas>');
  filterData(dataName) ;
})
function forChart(data_received,name){
  var jourFilter= $('.periode.selected').attr('data-j') ;
  gtitre.innerHTML='Tendance '+dataName+' >' ;
  //alert(jourFilter) ;
  var ctx = document.getElementById('chart').getContext('2d');
  var x=String(data_received).substring(1).split(',') ;
  //console.log("data received :"+x+" taille:"+data_received.length) ;
  //console.log("chart "+name) ;
  var url="https://www.orange.mg/api/devises";
  var listDonne='';
  var listJ='' ;
  var listM='';
  var statement='' ;
  $.get(url).done(function(data){
    for (var i = 0; i < data.length; i++){
      if (data[i].name==name){
          //console.log("name ato: "+data[i].name) ;
          var temp=0 ;
          temp=data[i].mids[x[0]];
          for (var j = x.length-jourFilter; j < x.length; j++) {
              if (j==x.length-jourFilter) {
                statement+='unchanged ' ;
              }
              else {
                if (temp<data[i].mids[x[j]]){
                  statement+='up_right ' ;
                }
                if (temp>data[i].mids[x[j]]){
                  statement+='down_right ';
                }
                if (temp==data[i].mids[x[j]]){
                  statement+='unchanged ' ;
                }
              }
              ////console.log(statement) ;
              temp=data[i].mids[x[j]] ;
              listDonne+=data[i].mids[x[j]]+' ' ;
              listJ+=x[j].substring(8)+' ' ;
              listM+=x[j].substring(5,7)+' ';
          }
      }
    }
    var donne= listDonne.trim().split(' ');
    statement= statement.trim().split(' ');
    //console.log(statement) ;
    //console.log('donne for send:'+donne+' x: '+x) ;
    loadListMois(x,donne,jourFilter,statement) ;
    //nombre de donnee
    x= listJ.trim().split(' ') ;
    //console.log("donnee for chart:"+x) ;
    chartjs = new Chart(ctx,{
      type:'line',
      data: {
        //creation label axe //
        labels: x,
        //dataset properties
        datasets:[{
          label: 'Cours',
          fill: true,
          backgroundColor: gradient,
          borderColor: '#085EBD',
          data:donne,
          lineTension: 0,
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
              labelString: 'Jour'
            }
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: false,
              labelString: 'cour'
            }
          }],

        }
      },//fin option
    });
    resizing(1,listM) ;
  })
  ////console.log("month: "+listM) ;
}
function removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    chart.update();
}
function loadListMois(dataDate,value,nbrJ,state){
  //console.log("donnee :"+value+' date:'+dataDate) ;
  var output='' ;
  var j="" ;
  var y="";
  var m=""

  for (var i = dataDate.length-1,j=value.length-1; i >=dataDate.length-nbrJ;i--,j--){
    //console.log("tableau:"+dataDate[i].substring(8,10)) ;
      output+='<tr>'+
        '<td style="position:relative;">'+dataDate[i].substring(8,10)+'-'+dataDate[i].substring(5,7)+'-'+dataDate[i].substring(0,4)+'<div class="right-arrow" style="margin-top:9.5px ;"></div></td>'+
        '<td style="display:flex;padding-right:0px ;">'+value[j]+'<div class="state_value"><div class="arrow-state state_icon '+state[j]+'"></div></td>'+
      '</tr>';
  }
  //console.log("*******************:"+output) ;
  dateVl.innerHTML=output;
}
function resizing(nbr,data){
  var counter =0 ;
  var prev=0 ;
  var current=0 ;
  var chartContainer=document.querySelector('div.arrow-month') ;
  var size = chartContainer.clientWidth ;
  var tab=data.trim().split(' ');
  var listNbr='';
  var listMonth='';
  var output='' ;
  var arrowlist=document.querySelector('.arrow-month') ;
  current=tab[0] ;
  counter=0 ;
  //console.log(tab) ;
  for (var i = 0; i < tab.length; i++) {
    if(current==tab[i]){
      //console.log(current+' et '+tab[i]) ;
      counter++ ;
      if (i==0) {
        listMonth+=tab[i];
      }
    }
    else {
      //console.log(current+' # '+tab[i]) ;
      listNbr+=counter+',' ;
      listMonth+=','+tab[i];
      current=tab[i] ;
      //console.log('current:'+current) ;
      counter=1 ;
    }
  }
  listNbr=listNbr+counter ;

  //console.log("mois:"+listMonth) ;
  var tab_month=listMonth.split(',')
  var tab_prc=listNbr.split(',') ;
  //console.log(tab_prc) ;
  var width=0 ;
  for (var i = 0; i<tab_prc.length; i++){
    //console.log("value "+tab_prc[i])
    width=(tab_prc[i]*100)/tab.length ;
    output+='<div class="month" style="width:'+width+'% ;">'+getMonthString(parseInt(tab_month[i]))+'<div class="container-arrow"><div class="left-arrow"></div><div class="line-arrow"></div><div class="right-arrow"></div></div> </div>' ;
  }
  //console.log("sortie :"+output)
  arrowlist.innerHTML=output ;
}
})
