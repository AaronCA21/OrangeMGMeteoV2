___portaljquery(window).bind('load', function() 
{
	//we can remove these functions if not used in any country anymore
	___portaljquery("#etn_btn_faq_yes").on('click touch', function () 
	{
		___portaljquery.ajax({
			type: "POST",
			url: ______portalurl + "faqstat.jsp",
			data : {document_title:document.title,ourl:______dcurl,l_href:location.href, ref:document.referrer,muid:______muid, coption : 'yes' },
			dataType: "html",
			success: function(html){
			},
			error:function (xhr, ajaxOptions, thrownError){
				console.log("affMob\n"+xhr.responseText);
			}
		});
	});

	___portaljquery("#etn_btn_faq_no").on('click touch', function () 
	{
		___portaljquery.ajax({
			type: "POST",
			url: ______portalurl + "faqstat.jsp",
			data : {document_title:document.title,ourl:______dcurl,l_href:location.href, ref:document.referrer,muid:______muid, coption : 'no' },
			dataType: "html",
			success: function(html){
			},
			error:function (xhr, ajaxOptions, thrownError){
				console.log("affMob\n"+xhr.responseText);
			}
		});
	});

	__refreshscreen=function()
	{
		location.reload();
	};
	
	deepCopy=function(sourceObj) 
	{
		return JSON.parse(JSON.stringify(sourceObj));
	};
		
	//new code for datalayer - 30 oct 2019
	___pushDataLayerEvent=function(that, typ)
	{
		if(!typ) typ = "click";
		
		if(typeof dataLayer !== 'undefined' && dataLayer != null)
		{
			var __dlcontent = deepCopy(_etn_dl_obj);
			__dlcontent.event = "standard_click";
			for(var i=0;i<that.attributes.length;i++)
			{
				if((that.attributes[i].nodeName+"").indexOf("data-dl_")>-1)
				{
					var _dlc = that.attributes[i].nodeName.substring("data-dl_".length);
					__dlcontent[_dlc] = that.attributes[i].value;
				}
			}                        

                        if(typ=='load'){
                            __dlcontent.event = "load";
                            __dlcontent.event_action = 'load';
                        } 

			dataLayer.push(__dlcontent);
		}
	};
	
	___pushDataLayerProductImpression=function(that, typ)
	{
		if(!typ) typ = "click";
		
		if(typeof dataLayer !== 'undefined' && dataLayer != null)
		{
			var productImpression = new Object();
			var ecommerceObj = new Object();
			productImpression.event = "productClick";                        

			if(typ=='load'){
				productImpression.event = "load";
			} 
			productImpression.ecommerce = ecommerceObj;

			var products = [];
			var product = new Object();
			for(var i=0;i<that.attributes.length;i++)
			{
					if((that.attributes[i].nodeName+"").indexOf("data-pi_")>-1)
					{
							var _dlc = that.attributes[i].nodeName.substring("data-pi_".length);
							product[_dlc] = that.attributes[i].value;
					}
			}
			products.push(product);

			ecommerceObj.click = {actionField:{'list':'Search results'}};
			ecommerceObj.products = products;

			productImpression.event_action = "";
			productImpression.event_category = "";
			productImpression.event_label = "";
			dataLayer.push(productImpression);
		}
	};

	___portaljquery(document).on("click touch",".etn-data-layer-event",function()
	{
		___pushDataLayerEvent(this);
	});

	___portaljquery(".etn-data-layer-load").each(function()
	{
		___pushDataLayerEvent(this,'load');
	});

	___portaljquery(document).on("click touch",".etn-dl-product-impression-click",function()
	{
		___pushDataLayerProductImpression(this);
	});


	___portaljquery(".etn-dl-product-impression-load").each(function()
	{
		___pushDataLayerProductImpression(this,'load');
	});
	
});