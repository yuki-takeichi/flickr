// DOMを操作する場合はページの読み込みを待つ
$(function() {

  $("#container").masonry({
    itemSelector: '.box'
  });

  $("#searchButton").click(function(){

    var keyword = $("#keyword").val();
    var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=aaf61cceb5b3be871b3ce6d228127a4e&format=json&tags=' + keyword;
    $.ajax({
      type: 'GET',
      url: url,
      dataType: 'jsonp',
      jsonpCallback: 'jsonFlickrApi'
    });

  });


});

function jsonFlickrApi(result) {
  result.photos.photo.forEach(function(p) {
    var photoUrl = 'http://farm' + p.farm + '.staticflickr.com/' + p.server + '/' + p.id + '_' + p.secret + '.jpg';
    var imgDom = document.createElement("img");
    var randnum = Math.floor( Math.random() * 3 ) + 1;
    imgDom.setAttribute('src', photoUrl);
    imgDom.setAttribute('width', 100 * randnum);
    imgDom.setAttribute('height', 130 * randnum);
    //imgDom.setAttribute('width', '20%');
    //imgDom.setAttribute('height', '20%');
    //$("#container").append(imgDom);
    $("#container").masonry().append(imgDom).masonry('appended', imgDom).masonry();
  });
}
