json.messages do

json.array!(@my_messages) do |message|
  json.my_text  message.body
  json.my_user_avatar  message.user.avatar
  json.created_at message.created_at
end

json.array!(@your_messages) do |message|
  json.your_text  message.body
  json.your_user_avatar  message.user.avatar
  json.created_at message.created_at
end

end