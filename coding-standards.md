# Varcity Network App - Coding Standards

## Team: Maneki-Neko

* Wendy Beck
* Stephanie Fitzgerald
* Christy La Guardia
* Pierre Salumu

### General
* Indentation: 2 spaces instead of 4 (because we are lazy and don't want to change the React files)
* Semicolons: always use them
* Import third party and node modules first in files

### Styling Standards
* Use Bulma for grid (React Bulma?)
* SCSS
    * Reuse style wherever possible

### Version Control
* Branching
    * Individual devs have their own feature branches named "featureName"
    * When working, these get merged into a common dev branch
    * Master to heroku, as required
* Morning pull parties and total agreement before merging into dev or master
* Division of Labor:
    * Be clear about which features we are working on so we don't step on each others' toes
    * Front-load the preparation so we can autopilot execution
        * In particular, determine props to pass down, methods, schemas

### Project Folder Organization
* By feature
    * See [Organizing Redux]('https://jaysoo.ca/2016/02/28/organizing-redux-application/')
    * Directory name is the feature name
        * Within the directory, don't repeat the feature name
* Capitalization/Casing:
    * TitleCase:
        * Schemas, Components
    * camelCase:
        * helpers, services, filenames, directory names
    * try to make feature names be one word

### Deployment Standards
* Remove all console.logs that shouldn't be there in Master and Dev
    * i.e. There should be nothing showing in the console after deployment
* Be sure to eslint-ignore any necessary consoles
* Remove all your comments before merging to master (preferably before merging to dev)
* mLab database on Heroku is Varcity

### Time Management
* Pair in the morning, then split out
* Morning stand ups
* Quick review/catch up stand up after lunches
* Don't work in the dark/struggle alone - use your teammates when you get stuck or we can get someone else

### Testing
* Hardcode so we can snapshot, then parameterize
* TDD, but not to excess:
    * Use boilerplate unit and e2e tests for our schemas and routes
    * Focus on getting value from our tests - spend time where we really need it
