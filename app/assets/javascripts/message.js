$(document).on ('turbolinks:load', function(){
  {
//     var html =
//       `<div class="message__top">
//           <h1>
//             ${data.user_name}
//           </h1>
//           <p class="date">
//             ${data.date}
//           </p>
//         </div>`


// ${data.message}

// var message = data.body
// var userAvatar = "<br><img src='" + data.user_avatar + "' class="message-avatar">"
// var html = `<br>
// <div class="chat-message__name">
//   userAvatar
//   <p>${data.body}</p>
// </div>`

// var html = userAvatar.append(data.text)


    // message = $(`<div class='message' data-message-id="${data.id}">`).append(html)
    // return html
  }

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
      // var html = buildHTML(data);
      // debugger
      var image = $('<img class="message-avatar">');
      image.attr("src", data.user_avatar.url);

      // var html = `<img src="${data.user_avatar.url}", class="message-avatar">${data.text}`

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



      // var html =  `<br> + ${image} + ${data.text}`
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

      // var messages = data.messages;
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



            //         %li.chat-message.clearfix
            // - if message.user == current_user
            //   .chat-message__header.clearfix.right_space
            //     .chat-message__name
            //       = image_tag message.user.avatar, class: "message-avatar"
            //     .chat-message__body
            //       = message.body

        $('.chat-messages').append(html);
      })
    })

    .fail(function() {


    });

  } else {
    clearInterval(autoReload)
  }
  }

    var time = 1000
  autoReload = setInterval(refreshingPartial, time)

});
