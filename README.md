ReMyth
======

Introduction
------------

This project is meant to provide a nicer remote for your MythTV Frontends.  You will be able to view your recordings, as well as send actions to a frontend of your choosing.

Installation
------------
# Install NodeJS
  Either follow instructions to install from source, or install from http://nodejs.org.
# Install npm
    curl http://npmjs.org/install.sh | sudo sh
# Install dependencies
    sudo apt-get install libavahi-compat-libdnssd-dev
    npm install creationix
    npm install forever-monitor
    npm install mdns
    npm install optimist
    npm install stack
# Hack mdns
  The dependency mdns expects all 
  
  Edit file node_modules/mdns/lib/service_type.js.  In this file there are 2 spots that check for a length of 14 or less.  Since MythTV's service names are longer than 14 characters this isn't going to work.  Comment out those checks.  I have not found this to harm the application in any way.
# Run "node spawn.js"

More coming soon!