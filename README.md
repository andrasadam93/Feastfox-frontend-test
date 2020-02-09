# Feastfox-frontend-test - Weather App
This repo contains a solution to https://github.com/vargaendre/front-end-test.

## Approach
I am most familiar with Angular and AngularJS so given the timeframe I decided to build a tiny angular app for this task. Obviously, Angular is a overly verbose for a task this simple, however, I wanted to display me being comfortable with Angular. With the design choices I wanted to address the responsivity and allow mysefl to achieve that easily - so I went with a component based Angular Material design at first. The already large Angular app got very large with some Material components included, and it felt overcomplicated. So I decided to add another, different design as well - see the 'light' branch. I wanted to make visual things easy, so icons are added (though I used a very simple material set which does not cover the information-range well). Since the app itself conveys a very simple message, I added some fade-in effects with the AOS library.

## Data
Querying the data from the Yahoo Weather API seems to be a nightmare (e.g. the official javascript code example in the documentation contains errors, it uses OAuth1, the API key takes 2-3 days to arrive, etc.), but it is added to the code - even if not working. Then I checked Open Weather API as well which seems more flexible, though I decided not to spend furthe time on it. The service for dynamic load is set up and if the OAuth worked it would load the data nicely.

Reading the JSON happens within the component itself, though it could/should also be refactored to the service. I kept it within the component for clarity while the API is not set up and working properly.

## Chart
I decided to stretch my comfort zone (which is using nvd3 for most of the data visualization) and went with ChartJS's ng-charts. I am not really amused by the responsivity of these charts, but they do the job for now. Should I work more on this project I would probably turn back to nvd3 (http://nvd3.org/).

## Third party libraries used:
1) Angular (cli install with npm) and all its dependencies - https://angular.io/
2) Angular Material - https://material.angular.io/
3) ChartJS - https://www.chartjs.org/
4) ng-charts (built on ChartJS) - https://valor-software.com/ng2-charts/
5) Animate-on-scroll - https://michalsnik.github.io/aos/

## Miscellaneous
1) Testing was not added to this task because of the short timeframe
