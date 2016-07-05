var app = angular.module('myApp', ['ngRoute']);


//route for pages
app.config(function($routeProvider){
	$routeProvider
	//route for list of questions
	.when('/',{
		templateUrl: 'questionList.html',
		controller: 'QusListController'
	})
	//route for detail page of questions
	.when('/:questionTitle',{
		templateUrl: 'questionDetail.html',
		controller: 'QusDetailController'
	})
	.otherwise({
		redirectTo: '/'
	});
});


//Controller for questionList page
app.controller('QusListController', function($scope,$http){
	
	$scope.qusList = [];
		
	// add question
	$scope.askQus = function(){
		var newid = $scope.qusList.length;
		newid++;
		
		if(!$scope.addQus)
		{return;}
		
		$scope.qusList.push(
			{id:newid, qus1:$scope.addQus}
		);		
	}
	
	//clear text field
	$scope.clear = function(){
		$scope.addQus = "";
	}

	//fetching json data
	$http.get('questions.json').success(function(data) {
        $scope.questions = data;
    });
  	
});

//Controller for question detail page
app.controller('QusDetailController',function($scope,$routeParams,$http){
	//in this section comments are shown and added
    $scope.showCmnt = [];

    $scope.addCmnt = function(){
		var newid = $scope.showCmnt.length;
		newid++;
		
		if(!$scope.addcmnt)
		{return;}
		
		$scope.showCmnt.push(
			{id:newid, cmnt:$scope.addcmnt}
		);
	}

	//clear text field
	$scope.clear2 = function(){
		$scope.addcmnt = "";
	}
	
	//in this section answers are shown and added
	$scope.showAns = [];

    $scope.giveAns = function(){
		var newid = $scope.showAns.length;
		newid++;
		
		if(!$scope.giveans)
		{return;}
		
		$scope.showAns.push(
			{id:newid, ans:$scope.giveans}
		);
	}

	//clear text field
	$scope.clear3 = function(){
		$scope.giveans = "";
	}

	//fetching json data
	$scope.qus = $routeParams.questionTitle;

	$http.get('questions.json').success(function(data) {
    $scope.x = data.filter(function(entry){
      return entry.qus === $scope.qus;
    })[0];       
  });
});



