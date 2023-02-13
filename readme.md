# cherry-chat
make sure 

the system installed nodejs

the ```.env.example``` file have the following 

1. MONGODB_URL
2. JWT_SECRET 
3. AUTH_COOKIE 
4. CLIENT_CONNECTION 

run ```./run.sh``` for instant dev set up or

follow these commands to set the dev env

1. create a ```.env``` file and set the variables like ```.env.example```
2. ```npm install```
3. ```cd frontend && npm install```
4. ```npm run dev```
5. ```npm run client:dev```  or ```cd frontend && npm start```

to set the MONGODB_URL , you can use either your mongodb localhost or use this as a demo db ```mongodb+srv://demouser:cherry-chat@cluster0.jwil72k.mongodb.net/?retryWrites=true&w=majority```
