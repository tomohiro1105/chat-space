json.array! @messages do |message|
  json.content message.content
  json.image message.image.url
  json.date message.created_at.strftime("%Y/%m/%d %H:%M")
  json.username message.user.name
  json.id message.id
end