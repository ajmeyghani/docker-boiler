# Docker Compose + Node + Nginx + Mongo

This is a Docker boilerplate project for building apps with Node, Mongo, Angular, and Nginx.

## Requirements

- Node > 5: Use NVM to install Node
- Docker and Docker Machine
- Virtual Box

## TL;DR

The fastest development flow is to first start each service and work on your local machine. That is running `npm run dev` inside the API server and the client-side app folder. But there are other options available:

- Run `npm run dev:mock` inside the client-side folder to run the app in mock mode.
- To run all the servers inside the container, run `./dev-docker.sh`. Then run `npm run watch` inside the client-side folder.
- Run `./deploy.sh` to deploy the app and serve it with Nginx
- If you want to run everything inside the container, you can change the entry command in `compose-dev.yml` to the following:

    ```bash
    npm run dev:docker
    ```

  Note that if you use this option, you might not be able to see the changes reflect immediately.

## Local Development

- Run `npm run dev` inside the client-side folder and the api-server folder to spin up everything.
- Also make sure that you are running Mongo: `mongod`.

Now that everything is running, just go to `http://localhost:8089` to see the app.

### Mock Mode

You can also run the app without the real backend using `npm run dev:mock` inside the client-side app folder.

## Development Inside Docker

Before anything make sure that you have a VM running. You can check that with `docker-machine ls`. This command will give you the names of the machines that you have. If you don't have a machine, you can create one with the following:

```bash
docker-machine create --driver=virtualbox machine-name
```

If your machine is not running, you can start it with `docker-machine start <name-of-machine>`. After the machine is running, you can load Docker:

```bash
eval $(docker-machine env <machine-name>)
```

After that, you should be able to run `docker ps` and see some output.


Now that you have your machine and docker setup, you can build the containers for development. First, run the build command to build the containers:

```bash
docker-compose -f compose-dev.yml build
```

This will build the containers using the dev configuration which basically sets up Nodemon for the files and mounts the volumes from you computer to the VM.

After that, you can run the containers:

```bash
docker-compose compose-dev.yml up
```

This will bring all the containers up and you should be able to see the app at the IP address of your VM. To get the IP, you can run the following:

```bash
docker-machine ip <name-of-vm>
```

Then to see the app go to the IP address followed by 8089 port: `http://<ip-address>:8089`. In addition to that, you need to make sure your Webpack is running while you work:

```bash
cd app-client && npm run watch
```

Running this command will start a watch and will output assets to the public folder. You can also start watching the tests on your machine by running the following:

```bash
npm run tdd
```

But if you want for everything to happen in the container, you can change the entry command in the `compose-dev.yml` file to the following:

```bash
npm run dev:docker
```

## Deploy

Run `./deploy.sh` from the root of the repo to serve the app in production mode using Nginx and Node.

