$(document).on ('turbolinks:load', function(){

  $(".js-form").on("submit",function(e){
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
      var image = $('<img class="message-avatar">');
      image.attr("src", data.user_avatar.url);

      var html = `
          <li class="chat-message clearfix">
          <div class="chat-message__header clearfix right_space">
          <div class="chat-message__name">
          </div>
          <div class="chat-message__body">
          <span class="text-left">${data.text}</span>
          <img class="message-avatar" src="${data.user_avatar.url}">
          </div>
          </div>
          </li>
          `

      $('.chat-messages').append(html)
      $('.text-field').val('');
    })
    .fail(function(){
      window.alert('テキストを入力するか、画像ファイルを選んでください。');
    })
    return false;
  });

  function refreshingPartial() {
    if (window.location.href.match(/messages/)) {
        $.ajax({
          type: 'GET',
          url: location.href + ".json",
        })
        .done(function(data) {
          $('.chat-messages').empty();

          array = [];
          $.each(data.messages, function(index, message){
            array.push(message)
          });

          alignedMessages = array.sort(function(a,b) {
            return (a.created_at > b.created_at ? 1 : -1);
          });

          $.each(alignedMessages, function(index, message){
            if (message.my_text) {
              var html =`
                <li class="chat-message clearfix">
                <div class="chat-message__header clearfix right_space">
                <div class="chat-message__name">
                </div>
                <div class="chat-message__body">
                <span class="text-left">${message.my_text}</span>
                <img class="message-avatar" src="${message.my_user_avatar.url}">
                </div>
                </div>
                </li>
                `
            } else if(message.your_text) {
              var html =`
                <li class="chat-message clearfix">
                <div class="chat-message__header clearfix">
                <div class="chat-message__name">
                <img class="message-avatar" src="${message.your_user_avatar.url}">
                </div>
                <div class="chat-message__body text-right">
                ${message.your_text}
                </div>
                </div>
                </li>
                `
            }
            $('.chat-messages').append(html);
          })
        })
        .fail(function() {
        });
      } else {
        clearInterval(autoReload)
      }
  }

    var time = 3000
    autoReload = setInterval(refreshingPartial, time)
});
