# Empowering Energy Solutions

This is a product intended for the business "Empowering Energy Solutions".

## Description
This software is meant to mainly be utilized by Energy site managers and Directors to view and monitor their sites energy performance, carbon emissions and expenditure for energy, heating and gas.

It will provide insights, metrics, visual representation of performance for each index.

## Installation
First you will need to initialise a git repo, then:
`git clone git@git.cardiff.ac.uk:c2043958/e2s-team-4.git`

With Node package manager installed and configured run `npm install` this will install
any packages present in packages.json (its a good idea to run this whenever you pull or switch branch)

Then run the most recent sql script available in db_data, note as we are all using the university
laptops our configurations are all the same and are as follows:

host: 'localhost',
    user: 'root',
    password: 'comsc',
    database: 'e2s_db'

It would be better practice to move these into an enviroment variables folder in future

Then you can run `npm run dev` in the terminal to run the project in dev mode.

Or for a more production like expierence you can `npm run build ` followed by `npm start`

## Testing and Deploy

To run our Jest test suite, run the command:
`run npm test`

This gitLab repo has a pipeline setup to automatically run these tests when a commit or merge is taking place


## Authors and acknowledgment
Dev team:
Archie Wilkins
Noa Sundqvist
Ethan Allen-Harris
Brodie Gordon-Beaven
