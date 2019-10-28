# MagicDateBall
Where do you wanna eat? Ask the Magic Date Ball!
This is an app I wrote using Laravel, Vue, Guzzle, and the Yelp API to give date night an easy mode when choosing where to eat!

## Requirements:
PHP 7.2

## Installation:
1. Clone the project to your local PC.
```
git clone https://github.com/cdterry87/MagicDateBall.git
```

2. Setup the application:
```
composer install          # Install dependencies with composer
cp .env.example .env      # Create your .env file based on the .env.example file and change the appropriate values
php artisan key:generate  # Generate an application key for your project
npm install               # Installs dependencies with npm
npm run build            # Builds the javascript part of the application

php artisan serve         # Runs the application on a local web server
```

### Note: You'll also need a Yelp API key in order to make it work.  You'll have to define it in your .env file
