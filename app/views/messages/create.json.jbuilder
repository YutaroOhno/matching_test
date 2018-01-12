json.set! :id , @message.id
json.set! :text, @message.body
json.set! :created_at, @message.created_at.strftime('%Y年%m月%d日 %H:%M:%S')
json.set! :user_avatar, @message.user.avatar