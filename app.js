//app.js
var myModule = angular.module('Angello', []);
//the second parameter is an array that Accepts other
//sub-modules to provide additional functionality, if necessary
//It's considered best practice to divide feature into sub-modules
//and then inject them into the main application module.
var myModule = angular.module('Angello',[]);


myModule.factory('AngelloHelper',function(){
  var buildIndex = function(source, property){
    var tempArray = [];

    for(var i=0, len = source.length; i < len; ++i){
      tempArray[source[i][property]] = source[i];
    }
    return tempArray;
  };
  return {
    buildIndex:buildIndex
  };
});
//Directives are one of the most powerful and exciting things
//in AngularJS
myModule.service('AngelloModel', function(){
  var service = this,

  //If controllers should be lightweight and specific to
  //the view for which they're responsible, whta happens
  //if two controllers need to share the same information?
  //Controllers definitely shouldn't know about each other.
  //So what happens if some piece of information starts in one
  //controller and you realize that it needs to be available
  //in another controllers?
  //The answer to these questions is an AngularJS service.
  //You promote the common data from the controller and make
  //it availableto the entire application by exposing it via a service.

  statuses = [
    {name:'back Log'},
    {name:'To Do'}
  ],
  types = [
    {name:'Feature'},
    {name:'Enhancement'}
  ],

  stories = {
    title :'Fist story',
    description:'Our first story.',
    criteria:'Criteria pending.',
    status:'To Do',
    reporter:'Nelly Kwaschi',
    assignee:'Brian Ford'

  },
  {
  title:'Second story',
  description:'Do something.',
  criteria:'Criteria pending',
  status:'Back Log',
  type: 'Feature',
  reporter: 'Lukas Ruebbelke',
  assignee:'Brian Ford'
},

{
title:'Another story',
description:'Just one more.',
criteria:'Criteria pending',
status:'Code Review',
type: 'Enhancement',
reporter: 'Lukas Ruebbelke',
assignee:'Brian Ford'
}
];
service.getStatuses function(){
  return statuses;
};
service.getTypes = function(){
  return types;
};

service.getStories = function(){
  return stories;
};
});
myModule.controller('MainCtrl', function(AngelloModel){
  var main = this;
  //...
  main.types = AngelloModel.getTypes();
  main.statuses = AngelloModel.getStatuses();
  main.stories =  AngelloModel.getStories();
  main.typesIndex = AngelloModel.buildIndex(main.types, 'name');
  main.statusesIndex = AngelloModel.buildIndex(main.statuses, 'name');
currentType
  main.setCurrentStory = function (story){
    main.currentStory = story;
    main.currentStatus = main.statusesIndex[story.status];
    main.currentType = main.typesIndex[story.type];
  };
  main.createStory = function(){
    main.stories.push({
      title:'New Story',
      description:'Description pending.',
      criteria:'Criteria pending.',
      status:'Back Log',
      type:'Feature',
      reporter:'Pending',
      assignee:'Pending'
    });
  };

  main.setCurrentStatus = function(status){
    if(typeof main.currentStory !== 'undefined'){
      main.currentStory.status = status.name;
    }
  };
  main.setCurrentType = function(type){
    if(typeof main.currentStory !== 'undefined'){
      main.currentStory.type = type.name;
    }
  };
});
myModule.directive('story', function(){
  return {
    scope:true,
    replace: true,
    template:'<div><h4>{{story.title}}</h4><p>{{story.description}}</p></div>'
  }
});
