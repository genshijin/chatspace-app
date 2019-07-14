$(function () {
  function buildHTML(message) {
    var body = message.body ? `${ message.body }` : "";
    var image = message.image ? `${ message.image }` : "";
    var html = `<div class="message">
                  <div class="message__upper-info">
                    <p class="message__upper-info__talker">
                      ${ message.name}
                    </p>
                    <p class="message__upper-info__date">
                      ${message.date}
                    </p>
                  </div>
                    <p class="message__text">
                      ${body}
                    </p>
                  ${image}
                </div>`
    return html;
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
      $('#message_body').val('');
    })
    .fail(function (data) {
      alert('エラーが発生したためメッセージは送信できませんでした。');
    })
    .always(function (data) {
      $('.submit-btn').prop('disabled', false);
    })
  })
})