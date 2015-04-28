awa-admin
====

via [ng-manager](https://github.com/dogenzaka/ng-manager)

<br/>
Features
----
- Management console for each environment.

TODO
----
- API for admin


<br/>

Development
----
awa-admin requires to be installed gulp before running.  
To install gulp, run

```shell
npm install -g gulp
```

To install dependencies
```shell
npm install
bower install
```

To run server  
```shell
gulp
```
access in browser `http://localhost:4000`

<br/>
#### Local Run
##### API server run
You should installed in local environment, [VirtualBox](https://www.virtualbox.org/wiki/Downloads).  
Run api server, command here.
```shell
$cd <your git repository home>
$git clone git@github.com:awa/liverpool-server.git
$cd liverpool-server
$vagrant up
$make fixtures
```

##### awa-admin server run
After run api server, You can run admin server.
```shell
$cd <awa-admin home>
$gulp
```
access in browser, `http://localhost:4000/#/endpoints`  
and register endpoint, `http://localhost/admin`  
(It will be saved to your localstorage in browser.)  
You will can open `http://localhost:4000/#/top`

<br/>
Authorization
-----
full ver server uses Google OAuth as authentication provider.  
Before starting, you should set client info into environment variables.

```shell
export GOOGLE_CLIENT_ID=...
export GOOGLE_CLIENT_SECRET=...
export GOOGLE_CALLBACK_URL=...
```
