
### CLP EMS Library (POC)

Manage the CRUD operation of the Neo4j database. It's a service that handle in getting and creating data to save in the database. It will close the connection after each function is invoke. This is not yet finish. It uses the neo4j-driver.

### Setting the Neo4j Credentials
```
NEO4J_USERNAME=
NEO4J_PASSWORD=
NEO4J_HOST=
```
### Services
1. Customer Service  
    methods - `get()` and `create(data)`
2. PV System Service  
    methods - `get()`, `create(data)`, `locatedAt(pvSystemName, premiseName)`
3. PV Inverter Service
    methods - `get()`, `create(data)`, `belongsTo(pvSerial, pvSystemName)`
4. Address Service
    methods - `get()` and `create(data)`
5. Premise Service
    methods - `get()` and `create(data)`
6. Phase Service
    methods - `get()` and `create(data)`
7. Installation Service
    methods - `get()` and `create(data)`
8. Meter Service
    methods - `get()` and `create(data)`
9. Geo Service
    methods - `get()` and `create(data)`
10. Floor Service
    methods - `get()` and `create(data)`
11. Building Service
    methods - `get()` and `create(data)`
12. Address Service
    methods - `get()` and `create(data)`

All the methods returns a `Promise`
### Usage
```
    const pvSystemService = require('clp-ems-lib').PVSystem;
    
    // Create PV System with name
    pvSystemService.create({name : "NCU_12W_9F_1"})
        .then((records) =>  {
            console.log(records);
        })
        .catch((err) => {
            console.log(err)
        })
        
    // Get all the PV System    
    pvSystemService.get()
        .then((records) =>  {
            console.log(records);
        })
        .catch((err) => {
            console.log(err)
        })        
```
## How to release

1. Create a fix or feature branch
2. `npm run build`
3. `npm run bumpVersion`
4. Create pull or merge request
5. npm tag -a vX.X.X -m 'release: vX.X.X'

## Install

This project is private project not publish to the public npm registry.

To add as a dependency, you need to add to your package.json the library as follow (with the correct #tag version):

    "clp-ems-lib": "git@github.com:bistmaster/clp-service.git#vX.X.XS"
