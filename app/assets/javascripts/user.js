$(document).on('turbolinks:load', function(){
  function appendUserHTML(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    $('#user-search-result').append(html);
  }

  function appendErrorHTML(msg){
    var html = `<div class="chat-group-user clearfix">
    <p class="chat-group-user__name">${msg}</p>
    </div>`
    $('#user-search-result').append(html);
  }

  $("#user-search-field").on('keyup paste', function(){
    var input = $("#user-search-field").val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data:{keyword: input},
      dataType: 'json',
    })
    .done(function(users){
      $("#user-search-result").empty();
      if (input.length !== 0){
        if (users.length !== 0 ){ 
          users.forEach(function(user){
            appendUserHTML(user);
          })
        }
        else {
          appendErrorHTML("一致するユーザーが見つかりません");
        };
      };
    })
    .fail(function(){
      alert('ユーザー検索に失敗しました');
    })
  });
})
$(function() {
  function appendMemberHTML(user_id, name){
    var html = `<div class='chat-group-user clearfix js-chat-member' id='${user_id}'>
                  <input name='group[user_ids][]' type='hidden' value='${user_id}'>
                  <p class='chat-group-user__name'>${name}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
    $("#chat-group-users").append(html);
  }
  $(document).on("click", ".user-search-add",function(){
    $("#chat-group-users").val();
    var user_id = $(this).data('user-id');
    var user_name = $(this).data('user-name');
    $(this).parent().remove();
    appendMemberHTML(user_id, user_name);
  })
  $(document).on("click",".user-search-remove", function(){
    $(this).parent().remove();
  })
})