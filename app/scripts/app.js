(function() {

    function config($stateProvider, $locationProvider) {

         $locationProvider
             .html5Mode({
                 enabled: true, //!# display is disabled in the URL
                 requireBase: false
             });

         $stateProvider
             .state('home', {
                 url: '/home',
                 controller: 'HomeCtrl as home',
                 templateUrl: '/templates/home.html'
             });
    }

/**
 * @function : BlocChatCookies
 * @desc     : This function used uibModal to initiate the user to create a username for BlocChats.
 *           : Its called from the run() method of blocChat app module. run() is executed when the
 *           : instance of the blocChat app is created. So before the user can start using blocChats
 *           : he is asked to create a username.
 **/
    function BlocChatCookies($cookies, $document, $uibModal) {
        var currentUser = $cookies.get('blocChatCurrentUser');
        if (!currentUser || currentUser === '') {
          // Do something to allow users to set their username
           var parentElem = angular.element($document[0].querySelector('.modal-username-initiate'));
            console.log("parentelem: "+parentElem);

          $uibModal.open({
              animation: true,
              ariaLabelledBy: 'modal-title',
              ariaDescribedBy: 'modal-body',
              templateUrl: 'modalUsernameContent.html',
              controller: 'ModalUsernameInstanceCtrl',
              controllerAs: 'modalUser',
             // size: '',
              appendTo: parentElem

           });
        }
    }

    angular
        .module('blocChat', ['ui.router', 'firebase', 'ui.bootstrap', 'ngSanitize', 'ngCookies'])
        .config(config)
        .run(['$cookies', '$document', '$uibModal', BlocChatCookies]);

})();
