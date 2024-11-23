// default js to be added to all pages
(function($){

	if(typeof $ == 'undefined'){
		return;
	}

	var refreshBloc = function(url, blocId, eleId, blocDiv){
		$.ajax({
			url: url,
			type: 'POST',
			dataType: 'json',
			data: {
				"pageId" : eleId,
				"blocId" : blocId
			},
		})
		.done(function(resp) {
			if(resp.status == 1){
				var data = resp.data;
				var blocHtml = data.blocHtml;
				blocHtml += "\n<style type='text/css' >" + data.bodyCss + "</style>";
				blocHtml += "\n<script type='text/javascript' >" + data.bodyJs + "</script>";
				blocDiv.html(blocHtml);
			}
		});
	};

	$(document).ready(function(){
		if(typeof window.parent !== 'undefined'
			&& typeof window.parent.$ch !== 'undefined'
			&& typeof window.parent.$ch.isPageEditor){
			return false;
		}

		$('div.bloc_div[refresh-interval]')
		.each(function(index, blocDiv) {
			blocDiv = $(blocDiv);
			var refreshInterval = parseInt(blocDiv.attr('refresh-interval'));
			if( isNaN(refreshInterval)  || refreshInterval <= 0){
				return true;
			}
			try{
				var timeInterval = refreshInterval * 60 * 1000;
				/* debug timeInterval = refreshInterval * 1000;*/
				var blocId = blocDiv.attr('data-bloc-id');
				var contextPath = $('meta[name="etn:pagescontextpath"]').attr('content');
				var eleId = $('meta[name="etn:eleid"]').attr('content');
				var url = contextPath + "api/bloc.jsp";
				setInterval(function(){
					refreshBloc(url, blocId, eleId, blocDiv);
				}, timeInterval);
				refreshBloc(url, blocId, eleId, blocDiv);
			}
			catch(ex){}
		});
	});

})(window.jQuery);