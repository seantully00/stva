document.addEventListener("DOMContentLoaded", function() {
    var source = document.getElementById("poll-template").innerHTML;
		//Compile into a template
		var template = Handlebars.compile(source);
		
		var context = { "title": "poll title" };
		
		var html = template(context);
		
		document.getElementById("poll-title").innerHTML = html;
		
});