$(function(){//Same as document.addEventListener ("DOMContentLoaded"..)

	//Same as document.querySelector ("#navbarToggle").addEventListener()

	$("#navbarToggle").blur(function(event){
		var screenWidth = window.innerWidth;
		if (screenWidth < 768) {
			$("#collapsable-nav").collapse('hide');
		}
	});
});

(function(global){
	var dc={};//for david chu
	var homeHtml = "snippets/home-snippet.html";
	var allCategoriesUrl =
	"http://davids-restaurant.herokuapp.com/categories.json";
var categoriesTitleHtml = "snippets/categories-title-snippets.html";
var categoryHtml = "snippets/category-snippet.html";
	//Convincing function for inserting innerHtml for 'select'
var insertHtml = function(selector, html){
	var targetElem = document.querySelector(selector);
	targetElem.innerHtml =html;
};

//Show loading icon inside element identified by 'selector'
var showLoading = function(selector){
	var html ="<div class='text-center'>";
	html+= "<img src='images/ajax-loader.gif'></div>";
	insertHtml(selector,html);
};

//Return substitute of '{{propName}}'
//with propValue in given 'string'
var inserProperty = function (string, propName, propValue){
	var propToReplace ="{{"+propName+"}}";
	string = string
	.replace(new RegExp(propToReplace, "g"),propValue);
	return string;
}
//On page load(before image or CSS)
document.addEventListener("DOMContentLoaded", function(event){
showLoading("#main-content");
$ajaxUtils.sendGetRequest(
	homeHtml,
	function (responseText){
		document.querySelector("#main-content")
		.innerHtml = responseText;
	},
false);
});

//load the menu categories view
dc.loadMenuCategories = function(){
	showLoading("#main-content");
	$ajaxUtils.sendGetRequest(
		allCategoriesUrl,
		 builAndShowCategoriesHtml);
};

//Builds HTML for the categories page
//based on the data from the server
function builAndShowCategoriesHtml(categories){
//Load title snippet of categories page
$ajaxUtils.sendGetRequest(
	categoriesTitleHtml,
	function(categoriesTitleHtml){
		//Retrieve single category snippets
		$ajaxUtils.sendGetRequest(
			categoryHtml,
			function(categoryHtml){
				var categoriesViewHtml =
				builCategoriesViewHtml(categories,
														categoriesTitleHtml,
													categoryHtml);
			insertHtml("#main-content", categoriesViewHtml);
		},
		false);
	},
false);
}

//Using categories data and snippets html
//build categories view HTML to be inserted
//into page
function builCategoriesViewHtml(categories,
																categoriesTitleHtml,
																categoryHtml){
	var finalHtml = categoriesTitleHtml;
	finalHtml +="<section class='row'>";

	//Loop over categories
	for (var i=0;i<categories.length;i++){
		//Insert category values
		//that is where I stop...to be conitnue
	}
																}
global.$dc =dc;
})(window);
