(function(){
    function HomeCtrl ($scope, ChatRooms, Message) {

      this.chatRooms    = ChatRooms;
      this.roomName     = null;
      this.msgContents  = null;
      this.roomId       = null;
      this.getByRoomId  = Message.getByRoomId;
      this.send         = Message.send;

/**
 * @function : getPromiseAndAct
 * @desc     : Get the promise, once you get the promise "then" store the value returned by
 *           : the promise in controller's chatContents. Use $apply to make sure when it gets updated,
 *           : angular knows and update the chatContents.
 * @param    : {object} this
 *
 **/
     this.getPromiseAndAct = function(that) {
        this.getByRoomId(this.roomId).then(function(promiseValue) {
          that.chatContents = promiseValue.val();
          console.log(that.chatContents);
          $scope.$apply();
        });
      };

/**
 * @function : getChatContents
 * @desc     : This function updates the roomName with the active room.
 *           : It calls the service message.getRoomId() to get the
 *           : data(messages related to the active room) from firebase.
 * @param    : {number, object} roomIdKey, room
 *
 **/
      this.getChatContents = function (roomId, room) {
          this.roomName = room.roomName;
          this.roomId   = roomId;
          //Store the reference for the controller's "this"
          var that = this;
          this.getPromiseAndAct(that);

      };

/**
 * @function : sendChatContents
 * @desc     : This function updates chat contents in firebase. It calls the service send() to add the messages.
 *           : It also updates the active room chat contents in the browser.
 *
 **/
      this.sendChatContents = function () {
          var that = this;
          this.send(this.roomId, this.msgContents);
          this.msgContents = null;
          this.getPromiseAndAct(that);
     };

}

    angular
    .module('blocChat')
    .controller('HomeCtrl', ['$scope', 'ChatRooms', 'Message', HomeCtrl]);
})();
