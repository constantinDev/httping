# HTTPing

HTTPing is a console app you can use to remotely ping a website and determine how big of an delay it has.

## Installation

HTTPing is availabe for:

### [Windows](https://anonfiles.com/L8i09bDdo7/httping_exe)
### [Mac](https://anonfiles.com/f2k49dDdo7/httping)
### [Linux](https://anonfiles.com/l5ld96D3o4/httpinglinux)

## Usage

### Console app
```
node main --help
```
### Direct app
#### Windows
```
.\httping.exe --help
```
#### Linux
```
chmod a+x httpinglinux
./httpinglinux --help
```
#### Mac
```
chmod a+x httping
./httping --help
```

## Syntax
Once you open the app and start it with the --help parameter, you will see something like [this](https://imgur.com/a/WFWiPnj). This is the help section. You dont really need any parameter except of -t or --target, which contains the URL to ping. The delay parameter will default to 1000ms (1 second), the iterations parameter will default to 10, and the verbose parameter will default to false. If you have everything set up and ready to run, hit enter and let it run. Every ping will be shown with delay if its done and every ping will be averaged to one number.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)