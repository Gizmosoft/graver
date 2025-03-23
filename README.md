# Graver

This is the UI code repository for Graver - Postcard sharing app. Refer to [Graver Server Repository](https://github.com/Gizmosoft/graver-server) for backend server app code.  

## Tech Stack  

![ReactJS](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=fff&style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=fff&style=for-the-badge)
![Mongoose](https://img.shields.io/badge/Mongoose-800?logo=mongoose&logoColor=fff&style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-5FA04E?logo=nodedotjs&logoColor=fff&style=for-the-badge)
![Nodemon](https://img.shields.io/badge/Nodemon-76D04B?logo=nodemon&logoColor=fff&style=for-the-badge)
![Express](https://img.shields.io/badge/Express-000?logo=express&logoColor=fff&style=for-the-badge)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?logo=eslint&logoColor=fff&style=for-the-badge)
![Google Authenticator](https://img.shields.io/badge/Google%20Authenticator-4285F4?logo=googleauthenticator&logoColor=fff&style=for-the-badge)
![Axios](https://img.shields.io/badge/Axios-5A29E4?logo=axios&logoColor=fff&style=for-the-badge)
![Material Design](https://img.shields.io/badge/Material%20Design-757575?logo=materialdesign&logoColor=fff&style=for-the-badge)
![React Router](https://img.shields.io/badge/React%20Router-CA4245?logo=reactrouter&logoColor=fff&style=for-the-badge)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?logo=cloudinary&logoColor=fff&style=for-the-badge)
![MUI](https://img.shields.io/badge/MUI-007FFF?logo=mui&logoColor=fff&style=for-the-badge)

## Project Structure  

```text
📦 graver/
├── 📁 public/                   
├── 📁 src/                      
│   ├── 📁 assets/      
|   |   ├── favicon.ico         
│   ├── 📁 components/          
│   │   ├── About.jsx / About.css
│   │   ├── Dashboard.jsx / Dashboard.css
│   │   ├── GithubCard.jsx / GithubCard.css
│   │   ├── GitHubRepoCard.jsx
│   │   ├── GitHubRepoViewer.jsx
│   │   ├── Home.jsx / Home.css
│   │   ├── Logo.jsx / Logo.css
│   │   ├── Navbar.jsx / Navbar.css
│   │   ├── NavbarLogo.jsx
│   │   ├── Postcard.jsx / Postcard.css
│   │   ├── PostcardImageRefs.jsx
│   │   ├── TestPage.jsx / TestPage.css
│   ├── 📁 pages/                
│   │   ├── PostcardPage.jsx / PostcardPage.css
│   ├── 📁 services/             
│   │   ├── App.jsx / App.css
│   │   ├── index.css
│   │   ├── main.jsx
│   │   └── Theme.jsx
├── .env
├── env.txt                      
├── .gitignore                   
├── eslint.config.js             
├── index.html                   
├── LICENSE                      
├── package.json                 
├── package-lock.json           
├── README.md                    
├── static.json                  
└── vite.config.js            
```

## Installation

- Use `git clone` to clone the [repository](https://github.com/Gizmosoft/graver.git) to your local environment  

```bash
git clone https://github.com/Gizmosoft/graver.git
```

- Ensure you have [Node 22.x](https://nodejs.org/en/download) installed along with [npm package manager](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)  
- Run the below command to install all the dependencies:  

```bash
npm install
```

- Create a `.env` file in the root directory (where package.json file exists) with all the variables defined. Refer to the `env.txt` file to know about the variables required for the project  
- Run the below command to start the Node.js server in the dev mode:

```bash
npm run dev
```

- Or you can use the below command to start the server:

```bash
npm start
```

## App functionality

![Home Page](./src/assets/documentation/home.png)  
Users can login to the application using their Google account via the Google OAuth feature  

---
![Dashboard Page](./src/assets/documentation/dashboard.png)  
This is the Dashboard page where all your created postcards will appear. There is CREATE button which you can use to create a post card. About button takes you to the ABOUT page of the app and LOGOUT button logs user out to the Home page.  

---
![Create Postcard](./src/assets/documentation/create.png)  
On clicking CREATE button from the Dashboard page, you'll see this popup where you can upload a picture and write a message to appear on the back of the postcard. Note that, you can generate a postcard message using AI with the `Create Message with AI` button. Once done, click on SUBMIT to create a postcard. Created postcard will appear on the Dashboard page automatically.  

---
![Final Dashboard Page](./src/assets/documentation/dashboard2.png)  
This is how the dashboard would look after successfully creating a postcard.  

---
![Postcard Page](./src/assets/documentation/postcard.png)  
Use the FLIP button below the image to see the postcard message.  
Copy URL button can be used to get the shareable link for the postcard. This link can be shared with others, who can view this postcard in viewable mode.  
DELETE button can be used to delete the postcard permanently.  
Back to Dashboard button can be used to go back to the Dashboard page.  

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
