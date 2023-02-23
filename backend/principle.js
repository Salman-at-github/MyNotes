//We first create api for signing up user and creating a JWT from their doc id, we call it auth token and save it for secure connection.


//Create a fetchUser middleware that verifies the member's auth token whether its fake or not using req.user = decodeToken.user

//Once the user has signed up, they login using the credentials. At this point, another JWT is created using the user's doc id and sent to member's local storage.

//Next for authorized access, where ever auth is necessary, fetchUser middleware is called and the logged in member's local storage's auth token is verified to see if they have access or not.

//Next API for notes is created, first all notes are fetched using fetchUser mwr and getting the req.user.id from it, if any user is found with that then those notes are shown since:
//notes are created with an additional 'user' field that takes value from fetchUser's user.id (user:req.user.id)

//Next, for update note api, it takes the note's id in the params ('/api/update/:id' kind of) and finds the old note,then creates an updated note obj that includes the fields if they are not null, then it verifies id in note's user (we created it using signed up user's doc id remember? note.user to id in fetchUser's req.user.id and only then updates the old note by setting updated note into it.

//FOR DELETE, old note is found using /api/:id which is note id, then fetchUser's req.user.id is compared to old note's note.user (which is an id too), if yes then delete

//NOTE: the :id in params for update and delete will be resolved by context/fetch api's 