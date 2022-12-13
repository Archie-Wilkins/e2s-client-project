# Empowering Energy Solutions

This is a product intended for the business "Empowering Energy Solutions" (E2S).

## Description
This software is meant to mainly be utilized by Energy site managers, energy site Directors, and third party vendors and researchers to view and monitor site energy performance, carbon emissions and expenditure for energy, heating and gas.

It will provide insights, metrics, visual representation of performance for each index based on analysis.

It is currently closed-source.

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

If it appears that any dependencies or libraries are missing run the command `npm install` to install all the libraries in the package.json files.

## Problems Running?
Try installing the following dependency: `npm install next`.

## Testing and Deploy

To run our Jest test suite, run the command:
`run npm test`

We have used JSX tests in this project as it is compatible with react.

We debated on whether we should use selenium testing or not but we ultimately decided against using it as it is quite volatile due to its semi-volatile nature. This is due to how selenium testing works, it uses a test-script to sequentially execute actions on the web browser, this is a handy tool as it allows for easy and fast end-to-end testing. But it does come with drawbacks, such being any frontend changes could potentially ruin tests due to how it has to manually interact with elements (for example buttons and text fields). Whereas JSX is more robust as it can refer to specific elements with the `data-testid=""`, this means that no matter how the frontend is transformed as long as the elements have data-testid's the tests should function the same.

This gitLab repo has a pipeline setup to automatically run these tests when a commit or merge is taking place.

## Other

For information relating to frameworks, languages, libraries, security, database structure and more can be found in the GitLab [wiki](https://git.cardiff.ac.uk/c2043958/e2s-team-4/-/wikis/home)


## Authors and acknowledgment
Dev team:
Archie Wilkins
Noa Sundqvist
Ethan Allen-Harris
Brodie Gordon-Beaven
