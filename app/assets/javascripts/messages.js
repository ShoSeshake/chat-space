$(function() {
  function buildHTML(message) {
    var html = `<div class='message'>
                  <div class='upper-message'>
                    <div class='upper-message__user-name'>
                     ${message.user_name}
                    </div>
                    <div class='upper-message__date'>
                     ${message.time}
                    </div>
                  </div>
                  <div class='lower-message'>
                    <p class='lower-message__content'>
                      ${message.content}
                    </p>
                    <img class="lower-message__image" src="${message.image_url}" alt="" />
                  </div>
                </div>`
    return html;
  }
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
      $('form').reset();
      scroll(data)
    })
    .fail(function() {
      alert('メッセージ、または画像を入力してください');
    });
  });
});