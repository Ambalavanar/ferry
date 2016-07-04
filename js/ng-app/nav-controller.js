;(function() {

  angular
    .module('ferryApp')
    .controller('NavController', NavController);

  NavController.$inject = ["$scope", "$mdSidenav", "$timeout", "$mdDialog", "$location", "$rootScope"];

  function NavController($scope, $mdSidenav, $timeout, $mdDialog, $location, $rootScope) {

	console.log('Navigation Controller Initialized.');
    var mainContentArea = document.querySelector("[role='main']");

    $scope.autoFocusContent = false;
    $scope.sections = [];

    $scope.selectSection = function(section) {
        $scope.openedSection = section;
    };

    $scope.toggleSelectSection = function(section) {
        $scope.openedSection = ($scope.openedSection === section ? null : section);
    };

    $scope.selectPage = function(section, page) {
        $scope.currentSection = section;
        $scope.currentPage = page;        
    };

    $scope.isPageSelected = function(page) {
        return $scope.currentPage === page;
    };
    
    $rootScope.$on('$locationChangeSuccess', function() {
        
        var path = $location.path();
        var introLink = {
            name: "Home",
            url: "/UI/home",
            type: "link"
        };
        
        if (path == '/') {
            $scope.selectSection(introLink);
            $scope.selectPage(introLink, introLink);
            return;
        }

        var matchPage = function(section, page) {
            var url = page.url;
            if(url.indexOf('#') > 0)
                url = url.substring(2);
            if (path.indexOf(url) !== -1) {
                $scope.selectSection(section);
                $scope.selectPage(section, page);
            }
        };

        $scope.sections.forEach(function(section) {
            if (section.children) {
                // matches nested section toggles, such as API or Customization
                section.children.forEach(function(childSection){
                    if(childSection.pages){
                        childSection.pages.forEach(function(page){
                        matchPage(childSection, page);
                        });
                    }
                });
            }
            else if (section.pages) {
                // matches top-level section toggles, such as Demos
                section.pages.forEach(function(page) {
                matchPage(section, page);
                });
            }
            else if (section.type === 'link') {
                // matches top-level links, such as "Getting Started"
                matchPage(section, section);
            }
        });
    });

    $scope.closeMenu = function() {
        $timeout(function() { $mdSidenav('left').close(); });
    }

    $scope.openMenu = function() {
        $timeout(function() { $mdSidenav('left').open(); });
    }

    $scope.path = function() {
        return $location.path();
    }

    $scope.goHome = function($event) {
        $scope.selectPage(null, null);
        $location.path( '/' );
    }

    $scope.openPage = function() {
        $scope.closeMenu();

        if (self.autoFocusContent) {
        focusMainContent();
        self.autoFocusContent = false;
        }
    }

    $scope.focusMainContent = function($event) {
        // prevent skip link from redirecting
        if ($event) { $event.preventDefault(); }

        $timeout(function(){
            mainContentArea.focus();
        },90);

    }

    $scope.isSelected = function(page) {
        return $scope.isPageSelected(page);
    }

    $scope.isSectionSelected = function(section) {
        var selected = false;
        var openedSection = $scope.openedSection;
        if(openedSection === section) {
            selected = true;
        }
        else if(section.children) {
            section.children.forEach(function(childSection) {
                if(childSection === openedSection){
                    selected = true;
                }
            });
        }
        return selected;
    }

    $scope.isOpen = function(section) {
        return $scope.isSectionSelected(section);
    }

    $scope.toggleOpen = function(section) {
        $scope.toggleSelectSection(section);
    }

    /**
     * Define menu items here
     */
    $scope.seedMenuItems = function() {
        $scope.sections.push({
            name: "Home",
            url: "/UI",
            type: "link",
            children: [{
                name: "Data Dictionary",
                type: "toggle",
                pages: [{
                    name: "Data Connections",
                    url: "/UI/DataDictionary/Connections",
                    type: "link"
                    }, {
                        name: "Data Discovery",
                        url: "/UI/DataDictionary/DataDiscovery",
                        type: "link"
                    }, {
                        name: "Model Explorer",
                        url: "/UI/DataDictionary/ModelExplorer",
                        type: "link"
	                }, {
                        name: "Business Terms",
                        url: "/UI/DataDictionary/Terms",
                        type: "link"
	                }]
                }, 
                {
                name: "Data Mapping",
                type: "toggle",
                pages: [{
                        name: "Create Map",
                        url: "/UI/DataMapping/Create",
                        type: "link"
                    }, {
                        name: "View Maps",
                        url: "/UI/DataMapping/View",
                        type: "link"
                    }, {
                        name: "Code Generator",
                        url: "/UI/DataMapping/CodeGenerator",
                        type: "link"
                    }, {
                        name: "Lineage Explorer",
                        url: "/UI/DataMapping/DataLineage",
                        type: "link"
                    }]
                },
                {
                name: "Settings",
                type: "toggle",
                pages: [{
                        name: "Service Configuration",
                        url: "/UI/Settings/Config",
                        type: "link"
                    }, {
                        name: "Manage Users",
                        url: "/UI/Settings/Users",
                        type: "link"
                    }]
                }
            ]
        });
    };

    $scope.seedMenuItems();

    return $scope;

  } // Controller

})();
