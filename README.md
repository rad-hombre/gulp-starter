# Gulp Starter 

Just a slick "little" boilerplate to help start projects. 
This thing actually has a lot more going on than I initially anticipated to add. 

To get started: 
```
npm install; npm install gulp 
```

# Testing 
Testing uses [tape](https://github.com/substack/tape) which produces TAP output by default. For better testing output, installing something like [faucet](https://github.com/substack/faucet), [tap-spec](https://github.com/scottcorgan/tap-spec), or [tap-summary](https://github.com/zoubin/tap-summary) provides a better visual experience.   

To run tests just use the gulp task; pipe into something like faucet: 
``` 
gulp tests | faucet 
``` 

Or you can just use the npm script. It's a little faster: 
``` 
npm run test | faucet
``` 



#Troubleshooting
**devDependencies from in package.json aren't installing for some reason?**

 I had this issue as well. It seems running ```npm install --only=dev``` takes care of the issue by forcing NPM to install devDependencies.  


### TODO: 
* Give overview of file structure. 
* Give brief explanation of what's happening inside gulp, the tasks and the flow. 
 
