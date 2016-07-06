# Ferry
Ferry is a platform to manage enterprise data dictionary, data mapping and perform heuristic data comparison.
> This project is under construction.

## Getting Started

### Prerequisites
You will need git to clone the ferry repository. You can get git from http://git-scm.com/.

### Clone Ferry
```
git clone https://github.com/Ambalavanar/ferry.git
cd ferry/webui
```

### Install Dependencies
Install NodeJS from https://nodejs.org/
After installation, run npm install from ferry folder.
```
npm install
```
You should find that you have one new folder in your project.
 - ```node_modules``` - contains the npm packages for the tools we need.

Install Python dependencies using `pip <https://pip.pypa.io/en/stable/installing/>` from ferry folder.
```
pip install -r requirements.txt
```

### Running the App
To start the web application, run app.py.
```
python app.py
```
Open http://localhost:5000/UI to view the UI on browser.


### See it in Action 
Deployed in Heroku - https://ferry-webui.herokuapp.com/