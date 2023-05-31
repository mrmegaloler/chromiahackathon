#Download base image node v12.22.5
FROM node:latest

WORKDIR /app

#Copy the package.json file
COPY package.json ./

#Install local dependencies
RUN npm install

COPY . .

CMD ["npm", "start"]

LABEL version="0.1"
LABEL description="This is a custom Docker image for running the chromachat example in the rell documentation"
#Expose port for the Application
EXPOSE 7740 3000
