Welcome to my database project

This features three tables. One for guitarists, one for guitar brands and one linking the two together.
The point is to show a table of data that lists guitarists and the brand they endorse / is endorsed by.
The database file is named base.db, server is named server.js and there are three HTML files in the public
folder, one for each table.
This project uses SQLite with an Express server.
A lucidchart picture (base.db.png) is included to show how the base.db file is built.

HOW TO SET UP:
-Open git bash and navigate to current folder
-Run npm install
-Run npm start
-Go to localhost:8000

KNOWN BUGS:
-When shutting down server (CTR+C) the terminal sometimes throws an error message but still shuts down no problem

EDIT FEATURE IS WORK IN PROGRESS

API ENDPOINTS (found in server.js):
-/api/guitarists/ - gets the table of guitarists
-/api/brands/ - gets the table of guitar manufacturers
-/api/guitarist_brand - gets the table of guitarists and their endorsement, but will not list guitarists without an endorsement
-/add/:guitarist_name/:current_band_name/:endorsement - adds a new guitarist with an endorsement, at the moment you cannot add brands
-/delete/:id - deletes row with specified ID
