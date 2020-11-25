# A NodeJs module server

- use es6 modules
- parse binary messages from UDP socket, messages are track position from a radar
- use a worker for async elaboration of tracks
- may use rust/web assembly to prse messages
- store decode tracks on a mongodb collection of detected objects
- move old tracks to another collection after 2' with no position update of a vehicle/track
