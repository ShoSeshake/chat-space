$(function() {
    var buildHTML = function(message) {
      var content = message.content ? `${ message.content }` : "";
      var img = message.image.url ? `<img class="lower-message__image" src= ${ message.image.url }>` : "";
      var html = `<div class='message' data-id= ${message.id}>
                    <div class='upper-message'>
                      <div class='upper-message__user-name'>
                       ${message.user_name}
                      </div>
                      <div class='upper-message__date'>
                       ${message.created_at}
                      </div>
                    </div>
                    <div class='lower-message'>
                      <p class='lower-message__content'>
                        ${content}
                      </p>
                      ${img}
                    </div>
                  </div>`
      return html;
    };
  function scroll() {
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
  }
  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      type: 'POST',
      url: url,
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      var html = buildHTML(data);
      $('.messages').append(html);
      $('form')[0].reset();
      scroll(data)
    })
    .fail(function() {
      alert('メッセージ、または画像を入力してください');
    });
  });
  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){    
      last_message_id =  $('.message:last').data('id');
      $.ajax({
        url: 'api/messages/',
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        var insertHTML = '';
        if (messages.length !== 0 ){
          messages.forEach(function(message){
          insertHTML = buildHTML(message);
          $('.messages').append(insertHTML);
          scroll();
        });
      }
      })
      .fail(function() {
        alert('メッセージが自動更新されませんでした');
      });
    }
  };
  setInterval(reloadMessages, 5000);
});