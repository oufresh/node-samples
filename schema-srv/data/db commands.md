# Db omgo commands
admin

.\mongo.exe "mongodb://localhost:27017"

use admin
db.createUser(
      {
          user: "admin",
          pwd: "admin",
          roles: [ "root" ]
      }
  )

.\mongo.exe "mongodb://admin:admin@localhost:27017"
db.createUser(
  {
    user: "schemaUser",
    pwd: "schemaPwd",
    roles: [
       { role: "readWrite", db: "schema" }
    ]
  }
)




mongosh -u schemaUser -p schemaPwd --authenticationDatabase schema schema

use schema
db.createCollection(name, options)


mongodb+srv://schemaUser:schemaPwd@localhost:27017

mongodb+srv://schemaUser:schemaPwd@localhost:27017/?authMechanism=DEFAULT?authSource=schema
.\mongo.exe mongodb://schemaUser:schemaPwd@localhost:27017/?authSource=schema

mongo -u schemaUser -p schemaPwd --host localhost schema


db.auth( "schemaUser", "schemaPwd" )
use schema

show collections

db.geometries.drop()

db.schemas.insert({...})



