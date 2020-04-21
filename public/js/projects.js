
console.log("Script loaded");

$( ".mini" ).click(function() {
    //window.open('/projects/' + this.id , '_self');
    window.open(this.id);
});
$( ".minr" ).click(function() {
    window.open('/projects/' + this.id , '_self');
});

