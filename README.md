[![Build Status](https://travis-ci.org/movio/apidoc-ui.svg?branch=master)](https://travis-ci.org/movio/apidoc-ui)

# apidoc-ui
A fresh UI built using React + Redux for https://github.com/mbryzek/apidoc


## Preview

![APIDOC-UI-org](organization.png)

![APIDOC-UI-model](model.png)

![APIDOC-UI-resource](resource.png)


## Dev

UI Dev


    yarn install
    yarn start
    http://localhost:8080/
    
    yarn test
    yarn flow
    
Before a Pull Request

    yarn run check
    
App

    yarn start
    
## Deploy
Deploy will build and push to S3. You need to have ~/.aws/credentials setup with access to the S3 bucket for this

    yarn deploy
