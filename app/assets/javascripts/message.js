$(document).on('turbolinks:load',function(){
  function buildMessage(message){
    var html = `<div class="message">
                  <p class="message__user-name">
                    ${message.username}
                  </p>
                  <p class="message__date">
                    ${message.date}
                  </p>
                </div>
                  <p class="message-text">
                    ${message.content}
                  </p>
                  <img src='${ message.image ? message.image : ""}' class= "lower-message__image">
                `
    return html;
  }

  $('#new_message').on('submit', function(e){
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
    
    .done(function(message){
      var post = buildMessage(message)
      $(".chat-message").append(post);
      $("#message_content").val('');
      $("form")[0].reset();
      $(".chat-message").animate({scrollTop: $(".chat-message")[0].scrollHeight}, 'fast')
    })
    
    .fail(function(){
      alert("メッセージを入力してください");
    });
    return false; 
  });
});

