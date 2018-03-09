$(function(){
	$(".Xyi label").click(function(){
		if($("#Dxuan").is(":checked")){
			$(this).removeClass("bei")
		}else{
			$(this).addClass("bei")
		}
	})
})