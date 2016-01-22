# Pencilblue custom install

ssh to your vm and cd to /var/www

git clone git@github.com:alioso/probob.git probob
cd probob

## Install brew

  ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/linuxbrew/go/install)"

then

  brew doctor to see if all works

If you get a command not for brew:
  vim ~/.profile
add in there
  export PATH="$HOME/.linuxbrew/bin:$PATH"
  export MANPATH="$HOME/.linuxbrew/share/man:$MANPATH"
  export INFOPATH="$HOME/.linuxbrew/share/info:$INFOPATH"

run
  source ~/.profile

then
  brew doctor

Should be good to go. ja?

## Install nodeJS

  brew install node

This will take a while. we can talk about something else while this is happening. I suggest plates tectonics.
Let's see if that worked:

  node -v

## Install mongodb

  npm install mongodb

## Install command line for pencilblue

  npm install -g pencilblue-cli

## Get all dependencies

  npm install 
