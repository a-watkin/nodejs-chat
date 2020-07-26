## start the db

`docker-compose up`

## connect to it

`dokcer exec -it image_id`

## start mongo

`mongo`

## find the collection - this was admin by default to me

`show collections`

## switch to admin

`use admin`

## list collections of admin

`show collections`

here i have:

1. messages
2. system.indexes
3. users

## get all entries

Here getting all messages
`db.messages.find()`
