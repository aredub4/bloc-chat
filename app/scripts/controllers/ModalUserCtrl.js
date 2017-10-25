(function(){
    function ModalUsernameInstanceCtrl ($uibModal, $uibModalInstance, $cookies) {

           // this.createRoom = ChatRooms.createRoom;
            this.username  = null;

            this.ok = function () {
                console.log(this.username);
                if (this.username === null || this.username === "") {
                    alert("enter username please");
                } else {
                    $uibModalInstance.close($cookies.put('blocChatCurrentUser', this.username));
                }
            };
    }

    angular
    .module('blocChat')
    .controller('ModalUsernameInstanceCtrl', ['$uibModal', '$uibModalInstance', '$cookies', ModalUsernameInstanceCtrl]);
})();
