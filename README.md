# Tiekinetixproject

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.4.2.

## DESCRIPTION

Book Manager developed by Denis Cangemi for TIE Kinetix

Specs:

- @angular/cli 1.4.2
- node 6.11.3
- Angular 4.4.6
- Webpack 3.6.0


Successfully implemented features:

    - Books list with delete function
    - Create new book page
    - Edit exiting book page
    - Book details page

Problems:
    - Datetime two way data binding
        Datetime two way data binding in Angular is a bit tricky. To bind the value from control to
        the view, the format has to be yyyy-MM-ddTHH:mm.
        In the model given the date format is like this yyyy-MM-ddTHH:mmZ, so before passing the value,
        we have to cut the last character and the hours-minutes part.
        To pass the value from view to controller we have to add the 'T' character to the data value
        that is passed in this format yyyy-MM-dd.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests


