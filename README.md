# library-api

Library-api is a program that implements or at least try to implement a clean architecture approach, the current project uses adapters and strategies to implement IOdevices, plugins and extra features. So at the end itdoesnt rely on a framework or external library to be running.

## Installation

You will need to have node js and docker with docker-compose. After download the project, run inside the directory the following commands.
##### Currently docker-compose just have a postgres database initialized

```bash
# initialize database
docker-compose up --build

# install dependencies
npm install
```

## Usage

```bash
# run in development
npm run dev

# run in production
npm start
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Deploy


## License
[MIT](https://choosealicense.com/licenses/mit/)