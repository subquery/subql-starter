# SubQuery - Starter Package


The Starter Package is an example that you can use as a starting point for developing your SubQuery project.
A SubQuery package defines which data The SubQuery will index from the substrate network, and how it will store it. 

##Preparation

#### Install the SubQuery CLI

Install SubQuery CLI globally on your terminal by using Yarn or NPM:

```
$npm install -g @subql-cli
$yarn global add @subql-cli
```

Run help to see available commands and usage provide by CLI
```
$suqbl help
```

#### Initialize the starter package

Inside the directory in which you want to create the SubQuery project, simply replace `project-name` with your project name and run the command:

```
$subql init --starter project-name
```
Then you should see a folder with your project name has been created inside the directory, you can use this as the start point of your project. And the files should be identical as following:

```
- project-name
  L package.json
  L project.yaml
  L README.md
  L schema.graphql
  L tsconfig.json
  L docker-compose.yml
  L src
    L index.ts
    L mappings
      L mappingHandlers.ts
```
Last, under the project directory, run following command to install all the dependency.
```
$yarn install
```

## Configure your project

#### The Manifest

- The `project.yaml` is an entry point of your project. It defined the endpoint of the blockchain to be indexed.
  `dataSources.kind` defines the type of datasources. In `mapping.handlers`, we currently support three types of handlers,
  also `EventHandler` and `CallHandler` support filters.


#### The GraphQL Schema

- Next, you need to define the GraphQL schemas inside of `schema.graphql` file. To know how to write in  "GraphQL schema language",
we recommend to check out on [Schemas and Types](https://graphql.org/learn/schema/#type-language).

#### Mapping function

The mappings function defined how to transform the indexed data into the entities have defined in the schema above. Mappings are written 
in a subset of TypeScript called AssemblyScript which can be compiled to WASM (WebAssembly). 

- We also provided a few examples of a mapping function in `src/mappings/mappingHandlers.ts`. For each handler that is defined in `project.yaml`
under mapping.handlers, create an exported function of the same name. 

- Also, under the `src/index.ts`, you have to export the functions of handlers has defined in above.


#### Code generation

Next, run codegen command under your project root directory.

```
$yarn codegen
```
- This will create a new directory `src/types` which contains all generate entities in AssemblyScript.
- Generate entity class for each type you have defined previously in `schema.graphql`. These classes provide type-safe 
entity loading, read and write access to entity fields.

## Index a SubQuery project 

#### Build the project

In order to index your subquery project, it is mandatory to build your project first.
Run this command under the project directory.

````
$yarn build
````

#### Run required systems in docker

Then, under the project directory run following command:

```
$docker-compose up
```

#### Query the project

With the SubQuery project above deployed successfully, now in your docker container should have `subql-node`,`Postgres` and `Hasura/graphql-engine` running.

Open your browser and head to `http://localhost:8080/console`.

Under the `DATA` tab, on the left top corner select the schema you just created, it usually named `public`.
Then you can see the table is currently untracked, click on the `Track` button.

Finally, head to the `GRAPHQL` tab, in the explorer you should see the table is ready to query.

##Redeploy a project

If any changes to your SubQuery project require SubQuery node to reindex, it is necessary to repeat the above steps in [Configure your project](#configure-your-project).
And reindex again starting with the genesis block.
Also, restore a clean schema will ensure data stored correctly, go to Hasura console and under the `DATA` tab, select the corresponding schema and remove it.
