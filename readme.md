# Endpoints

- [create user](#create-user)
- [create ]

> URLBASE: https://express-blog-xa7v.onrender.com

---

## Create User

Method: POST

URL: /users/:username

Request Body:

css
Copy code
None
Parameters:

username (required) - The username of the user to be created.
Response:

message - A success message indicating that the user was created successfully.
user - The created user object.
Update User
Method: PUT

---

URL: /users/:username

Request Body:

todos (required) - An array of todo objects. Each todo object must have a label property of type string and a done property of type boolean.
Parameters:

username (required) - The username of the user to be updated.
Response:

user - The updated user object.
Get User's Todos
Method: GET

URL: /users/:username

Request Body:

css
Copy code
None
Parameters:

username (required) - The username of the user whose todos will be retrieved.
Response:

An array of todo objects.
Delete User
Method: DELETE

URL: /users/:username

Request Body:

css
Copy code
None
Parameters:

username (required) - The username of the user to be deleted.
Response:

A success message indicating that the user and all its todos were deleted successfully.
