### step 1
run
```git clone --branch master https://github.com/Mabior-Graham/Employee-Reporting-Portal.git```

### step 2
run
```cd Employee-Reporting-Portal```

### step 3
run
```npm install```

### step 4
replace mongodb://localhost:27017/ers in .env file with your connection string from mongodb compass
```
MONGO_URI=mongodb://localhost:27017/ers

```

### step 5
run
```node src/seeders/userSeeder.mjs```


### step 6
seed the database
run 
```node src/seeders/departmentSeeder.mjs```

### Accounts

```
User
email: jane@example.com
password: password
```


```
Admin User
email: admin@example.com
password: password
```

### step 7
start the development server
run 
```npm run dev```

### step 8
start the development server
open your browser and go to
http://localhost:3000/