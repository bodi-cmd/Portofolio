$(function () {
    var socket = io.connect();
    
    var $username = $('#name');
    var $password = $('#pass');

    var $slider = $('#slide');
    var $dashboard = $('#users');

    var $name = $('#formname');
    var $subject = $('#subject');
    var $msg = $('#message');
    var $email = $('#email');
    
 /*   const button = document.getElementById('submitname');
    button.addEventListener('click', function (e) {
        e.preventDefault();
        console.log('button was clicked');
        socket.emit('new user', {id: $username.val()}, function (data) {
        });
        $("#foil").hide();
    });
    
    const skip = document.getElementById('skip');
    skip.addEventListener('click', function (e) {
        e.preventDefault();
        $("#foil").hide();
    });
    */
    const hire = document.getElementById('hire');
    hire.addEventListener('click', function (e) {
        console.log('close');
        e.preventDefault();
        $("#hireform").show();
    });
    const close = document.getElementById('close');
    close.addEventListener('click', function (e) {
        console.log('close');
        e.preventDefault();
        $("#hireform").hide();
    });

    const send = document.getElementById('submitform');
    send.addEventListener('click', function (e) {
        console.log('send');
        e.preventDefault();
        $("#hireform").hide();
        socket.emit('new mail', {
            name: $name.val(),
            subject: $subject.val(),
            email: $email.val(),
            message: $msg.val()
        }, function (data) {});
    });

});