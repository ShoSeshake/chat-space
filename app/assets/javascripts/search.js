$(function() {
  var searchField = $("#user-search-field");
  var searchResult = $("#user-search-result");
  var groupMember = $("#chat-group-users");
  function appendUser(user) {
     var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</a>
                </div>`
      searchResult.append(html);
  }

  function appendErrMsgToHTML(msg) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ msg }</p>
                </div>`
    searchResult.append(html);
  }
  
  function appendMember(member) {
    var html = `<div class='chat-group-user clearfix js-chat-member', id="chat-group-user-${ member.id }">
                  <input type = "hidden", value = ${ member.id }, name = "group[user_ids][]", id ="group_user_ids_${member.id}">
                  <p class="chat-group-user__name">${member.name}</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn' data-user-id="${ member.id }" data-user-name="${ member.name }">削除</a>
                </div>`
    groupMember.append(html);
  }

  searchField.on("keyup", function() { 
    var inputUsername = searchField.val(); 
    if (inputUsername.length) {
      $.ajax({ 
        type: 'GET', 
        url: '/users', 
        data: { keyword: inputUsername }, 
        dataType: 'json' 
      }) 
      .done(function(users) {
        searchResult.empty();
        if (users.length !== 0) {
          users.forEach(function(user){
            appendUser (user);        
          });
        } else {
          appendErrMsgToHTML("一致するユーザーが見つかりません");
        }
      })
      .fail(function() {
        alert('ユーザー検索に失敗しました');
      })
    } else {
      searchResult.empty();
    }
  });
  $(document).on("click", ".chat-group-user__btn--add", function () {
    var member = {};
    member.id = $(this).data("user-id");
    member.name = $(this).data("user-name");
    $(this).parent().remove();
    appendMember(member);
  })
  $(document).on("click", ".chat-group-user__btn--remove", function () {
    $(this).parent().remove();
  });
});