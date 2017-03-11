document.addEventListener("DOMContentLoaded", function() {
    var source = document.querySelector("#poll-template").innerHTML;
		//Compile into a template
		var template = Handlebars.compile(source);
		
		var title = "Poll Title";
		
		var html = template(title);
		
		document.querySelector("#poll=results").innerHTML = html;
		
});