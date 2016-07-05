;(function() {
  /**
   * Definition of the main app module and its dependencies
   */
  angular
    .module('ferryApp', [
		'ngRoute', 
		'ngMaterial',
        'ngMessages'
	])
  .config(config);

  // safe dependency injection
  // this prevents minification issues
  config.$inject = ['$routeProvider', '$locationProvider', '$httpProvider', '$compileProvider', '$mdThemingProvider', '$mdIconProvider'];

  /**
   * App routing
   */
  function config($routeProvider, $locationProvider, $httpProvider, $compileProvider, themeProvider, iconProvider) {
      
  $locationProvider.html5Mode(true);

	console.log('Building routes');
    // routes
    $routeProvider
      .when('/UI', {
        templateUrl: '/views/home.html',
        controller: 'HomeController'
      })
      .when('/UI/DataDictionary/Connections', {
        templateUrl: '/views/data_dictionary/connections.html',
        controller: 'DDConnectionsController'
      })
      .otherwise({
        redirectTo: '/UI'
      });

    themeProvider.theme('default').primaryPalette('blue').accentPalette('blue');

    iconProvider.icon("ferry-logo", "/imgs/icons/ferry-logo.svg");
    iconProvider.icon("md-toggle-arrow", "/imgs/icons/toggle-arrow.svg", 48);
    iconProvider.icon("icon-database", "/imgs/icons/database.svg", 48);
    iconProvider.icon("icon-hdfs", "/imgs/icons/hdfs.svg", 48);
    iconProvider.icon("icon-messages", "/imgs/icons/messages.svg", 48);
    iconProvider.icon("icon-internet", "/imgs/icons/internet.svg", 48);
    iconProvider.icon("icon-api", "/imgs/icons/api.svg", 48);
    iconProvider.icon("icon-excel", "/imgs/icons/xls.svg", 48);
    iconProvider.icon("icon-csv", "/imgs/icons/csv.svg", 48);
    iconProvider.icon("icon-edit", "/imgs/icons/edit.svg", 48);
    iconProvider.icon("icon-delete", "/imgs/icons/trash.svg", 48);
    iconProvider.icon("icon-logout", "/imgs/icons/ic_exit_to_app_24px.svg", 48);
    iconProvider.icon("icon-bg", "/imgs/icons/staten-island-ferry.svg", 1200);
    
    //$httpProvider.interceptors.push('authInterceptor');
  }
  
  /**
	 * Place to store app level constants
	 * Usage:
	 *
	 * Inject CONSTANTS service as a dependency and then use like this:
	 * CONSTANTS.API_URL
  */
  angular
	.module('ferryApp')
	.constant('CONSTANTS', {
	  'API_URL': ''
	});
	
  
  /**
   * Run block
   */
  angular
    .module('ferryApp')
    .run(run);
  
  /**
   * Directives
   */
  angular
  .module('ferryApp')
  .directive('fixedTableHeaders', ['$timeout', function($timeout) {
	  return {
	    restrict: 'A',
	    link: function(scope, element, attrs) {
	      $timeout(function() {
	          container = element.parentsUntil(attrs.fixedTableHeaders);
	          element.stickyTableHeaders({ scrollableArea: container, "fixedOffset": 2 });
	      }, 0);
	    }
	  }
	}])
  .directive('menuLink', function() {
    return {
        scope: {
        section: '='
        },
        templateUrl: '/views/partials/menu-link.tmpl.html',
        link: function($scope, $element) {
        var controller = $element.parent().controller();

        $scope.isSelected = function() {
            return controller.isSelected($scope.section);
        };

        $scope.focusSection = function() {
            // set flag to be used later when
            // $locationChangeSuccess calls openPage()
            controller.autoFocusContent = true;
        };
        }
    };
    })
  .directive('menuToggle', [ '$timeout', '$mdUtil', function($timeout, $mdUtil) {
    return {
        scope: {
        section: '='
        },
        templateUrl: '/views/partials/menu-toggle.tmpl.html',
        link: function($scope, $element) {
        var controller = $element.parent().controller();

        $scope.isOpen = function() {
            return controller.isOpen($scope.section);
        };
        $scope.toggle = function() {
            controller.toggleOpen($scope.section);
        };

        $mdUtil.nextTick(function() {
            $scope.$watch(
            function () {
                return controller.isOpen($scope.section);
            },
            function (open) {
                var $ul = $element.find('ul');

                var targetHeight = open ? getTargetHeight() : 0;
                $timeout(function () {
                $ul.css({height: targetHeight + 'px'});
                }, 0, false);

                function getTargetHeight() {
                var targetHeight;
                $ul.addClass('no-transition');
                $ul.css('height', '');
                targetHeight = $ul.prop('clientHeight');
                $ul.css('height', 0);
                $ul.removeClass('no-transition');
                return targetHeight;
                }
            }
            );
        });

        var parentNode = $element[0].parentNode.parentNode.parentNode;
        if(parentNode.classList.contains('parent-list-item')) {
            var heading = parentNode.querySelector('h2');
            //$element[0].firstChild.setAttribute('aria-describedby', heading.id);
        }
        }
    };
    }])

    .filter('nospace', function () {
      return function (value) {
        return (!value) ? '' : value.replace(/ /g, '');
      };
    })
    .filter("humanizeDoc", function() {
      return function(e) {
          return e ? "directive" === e.type ? e.name.replace(/([A-Z])/g, function(e) {
              return "-" + e.toLowerCase()
          }) : e.label || e.name : void 0
      }
    }).filter("directiveBrackets", function() {
        return function(e, t) {
            if (t) {
                if (!t.element && t.attribute)
                    return "[" + e + "]";
                if (t.element && e.indexOf("-") > -1)
                    return "<" + e + ">"
            }
            return e
        }
    });

  run.$inject = ['$rootScope', '$location'];

  function run($rootScope, $location) {
    console.log('Application Initialized.');
  }
  
})();