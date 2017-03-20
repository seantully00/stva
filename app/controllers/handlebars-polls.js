document.addEventListener("DOMContentLoaded", function() {
    var source = document.querySelector("#poll-template").innerHTML;
		//Compile into a template
		var template = Handlebars.compile(source);
		
		var context = { "title": "poll title" };
		
		var html = template(context);
		
		document.querySelector("#poll-results").innerHTML = html;
		
});