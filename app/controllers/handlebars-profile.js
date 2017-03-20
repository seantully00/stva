document.addEventListener("DOMContentLoaded", function() {
    var source = document.getElementById("profile-polls").innerHTML;
		//Compile into a template
		var template = Handlebars.compile(source);
		
		var context = { "title": "poll title" };
		
		var html = template(context);
		
		document.getElementById("polls").innerHTML = html;
		
});