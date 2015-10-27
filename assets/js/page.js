var statichtml = 
{
	result : function(book)
	{
		return "<div class=\"journalnode\"><p class=\"title\">"+book.jname+"</p><p class=\"pubtime\">"+book.pubyear+"年"+book.pubmonth+"月 第"+book.jno+"期,第"+book.jvol+"卷</p><p class=\"storinfo\">现藏 "+book.storcount+" 本</p></div>";
	}
}

function loadQueries(type, qstr)
{
	$("#journal-list").html("");
	if(qstr === "")
	{
		//go init state
		console.log("Return to init");
		$("#welcome").removeClass("welcome-list").addClass("welcome-init");
	}
	else
	{
		$("#welcome").removeClass("welcome-init").addClass("welcome-list");
		$("#journal-list").html("<p id='findinfo'>找到相关期刊 <span id='jcount'>0</span> 本");
		$.ajax({
			type: 'GET',
     		url: "/queryJournal/"+qstr,
			success: function(bookdata){
				$(bookdata).each(function(i,book){
					$("#journal-list").append(statichtml.result(book));
					$("#jcount").html(i+1);
				});
			} ,
			dataType: "json"
		});
	}


}
$(function(){
	$("#queries").change(function(){
		loadQueries("name", $(this).val());
	})
})
