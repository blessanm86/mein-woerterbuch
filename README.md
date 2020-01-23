<div align="center">
  <h1>Mein Wörterbuch</h1>
</div>
<br />
<br />

A simple dictionary app I personally use to lean german. You can add words you learn along with its meaning. Only authenticated users will be able to add new words. A quiz feature will be added soon that enables you regularly test your knowledge.

Can be viewed here - https://mein-woerterbuch.firebaseapp.com/

## Development

This project is bootstrapped with `create-react-app`. So all the standard commands are avaliable from CRA are available.

To run the project

1. Run `yarn`
2. Run `yarn run start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Firebase

This project uses firebase for hosting and firestore for storage. To deploy your own version of this project you will need to create a new project on firebase and may need to update the `.firebaserc` and the config in `useFirebase` files. To auto deploy, add a new env variable `FIREBASE_LOGIN_CI_TOKEN` with your firebase token.
