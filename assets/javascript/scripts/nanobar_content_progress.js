var content_element = document.getElementById("content")
var root_element = document['documentElement']
var options = {
  classname: 'nanobar',
  id: 'progress-bar',
};

var nanobar = new Nanobar( options );
document.addEventListener('scroll', function() {
  scroll = ((root_element['scrollTop'] - content_element['scrollTop']) / (content_element['scrollHeight'] - root_element['clientHeight'])) * 100;
  percent_read = Math.min(scroll, 100)
  nanobar.go(percent_read)
});




