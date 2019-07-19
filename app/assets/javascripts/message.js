$(document).on('turbolinks:load', function(){
  function buildHTML(message) {
    var body = message.body ? `${ message.body }` : "";
    var image = message.image ? `${ message.image }` : "";
    var html = `<div class="message" data-message-id="${message.id}">
                  <div class="message__upper-info">
                    <p class="message__upper-info__talker">
                      ${ message.user_name}
                    </p>
                    <p class="message__upper-info__date">
                      ${message.date}
                    </p>
                  </div>
                  <p class="message__text">
                    ${body}
                  </p>
                  <img src="${image}" class="message__image">
                </div>`
    return html;
  }
  function scrollBottom() {
    var target = $('.message').last();
    var position = target.offset().top + $('.messages').scrollTop();
    $('.messages').animate({ scrollTop: position }, 300, 'swing');
  }
  $("#new_message").on("submit", function (e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('#new_message')[0].reset();
      scrollBottom();
    })
    .fail(function () {
      alert('エラーが発生したためメッセージは送信できませんでした。');
    })
    .always(function () {
      $('.submit-btn').prop('disabled', false);
    })
  });

  var interval = setInterval(function(){
    if(window.location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $(".message").last().data("message-id") || 0;
      
      $.ajax({
        url:  "api/messages",
        type: 'GET',
        data: {
          id: last_message_id 
        },
        dataType: 'json'
      })
      .done(function(data) {
        if (data.length > 0){
          var addHtml ='';
          data.forEach(function(message){
            addHtml += buildHTML(message);
          });
          $('.messages').append(addHtml)
          scrollBottom()
        }
      })
      .fail(function() {
        alert('自動更新に失敗しました')
      });
    } else {
      clearInterval(interval);
    }},5000);
});