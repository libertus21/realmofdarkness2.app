# realmofdarkness.app

Welcome to the realmofdarkness.app codebase! This repository contains the source code for a web application built with Django framework.

The realmofdarkness.app is a platform designed for role-playing game enthusiasts, providing a space to create and manage character sheets, chronicles, and more within the World of Darkness setting.

With this application, users can easily create and update character sheets, track their progress in various chronicles, and interact with other players in a collaborative environment.

Feel free to explore the code and contribute to the development of this exciting project!

## Known Issues

- Updated sheets with a chronicle change will not automatically be added to another person's home page even if they should be able to see it.
- Chronicles will not automatically be added to a person's chronicle list without using a bot command in the server first. A fix would be to update chronicles every time a user logs in.
- A character sheet is not setting the chronicle to None when a member leaves a server.
- Pressing enter when creating a new sheet should work as well
- "No Server" filter on the Dashboard is not working with sheets
- Being in a sheet when the character is deleted should redirect the user back home
- leaving a server does not automatically update a sheet you need to refresh the page

## Things to Implement

- Put a timer on returning Archived/Dead character to Active
- Impletment Draft/Active/Dead/Retired features more thoughroughly
- Server pages. Should include things like Settings/Exp Management/Server stats(clan stats ect)
- Make Character profiles Public (Add settings to allow what is shown)
