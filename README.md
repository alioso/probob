# Pencilblue custom install

A full featured Node.js CMS and blogging platform (plugins, server cluster management, data-driven pages)

More info on Pencilblue at https://pencilblue.org/ and https://github.com/pencilblue/pencilblue



## Get the repo

ssh to your vm and cd to /var/www
git clone git@github.com:alioso/probob.git probob
cd probob

## Install brew

  ```ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/linuxbrew/go/install)"```

then

  ```brew doctor to see if all works```

If you get a command not for brew:
  ```vim ~/.profile```
add in there
  ```export PATH="$HOME/.linuxbrew/bin:$PATH"
  export MANPATH="$HOME/.linuxbrew/share/man:$MANPATH"
  export INFOPATH="$HOME/.linuxbrew/share/info:$INFOPATH"```

run
  ```source ~/.profile```

then
  ```brew doctor```

Should be good to go. ja?

## Install nodeJS

  ```brew install node```

This will take a while. we can talk about something else while this is happening. I suggest plates tectonics.
Let's see if that worked:

  ```node -v```

## Install mongodb

Ubuntu 12.04

  ```echo "deb http://repo.mongodb.org/apt/ubuntu precise/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list```

Ubuntu 14.04

  ```echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list```

Reload local package database
  ```sudo apt-get update```

Install the MongoDB packages
  ```sudo apt-get install -y mongodb-org```

Install the command line
  ```npm install mongodb```

## Install command line for pencilblue

  ```npm install -g pencilblue-cli```

## Get all dependencies

  ```npm install```

You might need to install nodemon globally

  ``` npm install -g nodemon```

We are done here. From here we can just type ```nodemon``` to get our server started and connect to http://probob.local:2000/

Of course we assume you added probob to your hosts file (local, not VM)

Out of the vm
  ```sudo vim /etc/hosts```

## Optionally install the the project db

  ```mongorestore dump --host=127.0.0.1```

Then restart the server with ```nodemon```

## Troubleshooting

If you need to restart the server for file changes, type ```rs``` while nodemon is running

If you need to force stop the server, a simple ctrl z will do that, knowing that you will have to kill the nodeJS process before restarting with nodemon with ```killall -9 node```
