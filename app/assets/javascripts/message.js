$(document).on("turbolinks:load",function(){
  function buildMessage(message){
    var html = `<div class="message" data-message_id="${message.id}">
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
      $("form")[0].reset();
      $(".chat-message").animate({scrollTop: $(".chat-message")[0].scrollHeight}, 'fast')
    })
    
    .fail(function(){
      alert("メッセージを入力してください");
    });
    return false; 
  });
  
  
  var reloadMessages = function(){
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
    var last_message_id = $(".message:last").data("message_id");
    
    $.ajax({
      url: "api/messages",
      type: "GET",
      dataType: "json",
      data: {message_id: last_message_id},
    })
    
    .done(function(messages){
      var insertHTML = '';
      messages.forEach(function(message){
        
        insertHTML = buildMessage(message);
        $(".chat-message").append(insertHTML);
        if(last_message_id < message.id ){
        $(".chat-message").animate({scrollTop: $(".chat-message")[0].scrollHeight}, 'fast')
        } 
      }) 
    })
    .fail(function(){
      alert('自動更新失敗');
    });
  }
  };
  setInterval(reloadMessages, 5000);
});

