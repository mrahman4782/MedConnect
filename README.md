# MedConnect

https://medconnect-csc59867.netlify.app/

## Table Of Content

- [Purpose](#Purpose)
- [Description](#Description)
- [Technologies Used](#Technologies-Used)
- [Installation](#Installation)
- [Credit](#Credit)
- [Future Plans](#Future-Plans)

## Purpose
The US healthcare system is increasingly burdensome and costly. Medconnect offers a solution by providing a one-stop platform for medical services. Our AI offers reliable medical information, while our integration with Zoc Doc and Google Maps simplifies booking appointments with medical professionals and pharmacies. With Medconnect, access to healthcare is streamlined in one convenient app

## Description
The website is a one-stop-shop for medical information and booking. Users can talk to our medically trained chatbot about certain diseases, cost of medication, and what kind of specialise to look for. Users can then go to our map page and look up the closest pharmacies or hospitals, as well as book an appointemnt there using our integrated ZocDoc.


## Technologies Used
React Native, Expo, ZocDoc, ChatGPT, Netlify, Node, Firebase


## Installation
It is recommended to use Visual Studio Code. Also, in order to run this locally, you would need to have Firebase and Open ChatGPT set up. But once you do:

1. run in the folder of your choosing:
```
    git clone https://github.com/mrahman4782/MedConnect.git
```
2. In the base of folder, add the .env with Firebase Service Account key and OPENAI key
3. In both the backend and frontend, create a config folder and add your firebase json there
4. Then in both the backend and frontend folder, run 
```
    npm install
```
5. Then, useing two terminals, in one terminal navigate to /backend/functions/, and run
```
    node server.js
```
6. In the other terminal, navigate to /frontend/ and run
```
    npx expo start
```
This will bring up a few options to run on ios simulator, andriod simulator, or web. If you have expo on your phone, you can scan the QR code to run on your devices


## Credit
| Name               | Main Roles|
|--------------------|-------------| 
| [Mohammad Rahman](https://github.com/mrahman4782)| Backend, Firebase, ZocDoc | 
| [Namgyal Thily](https://github.com/Namgyal9)     | Chatbot AI|
| [Elizabeth Palacios](https://github.com/elypalacios) | Backend, Frontend UI, Map|
| [Yeongho Lee](https://github.com/k205leeyh)| Chat Page| 
| [Richard Yeung](https://github.com/ryrichard)      | Frontend, Debugging | 

## Future Plans
- Make the switch from chat page to Map/Zocdoc seemless
- Incorperate Google Map to Chatbot
- Make proper versions of ios and android
