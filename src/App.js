import React from 'react';
import './App.css';
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
  useSession,
  RedirectToSignIn,
} from '@clerk/clerk-react';

// Get the Publishable Key from the environment
const clerk_pub_key = 'pk_test_ZmFtb3VzLW11bGUtODguY2xlcmsuYWNjb3VudHMuZGV2JA';

function App() {
  return (
    // Wrap your entire app with ClerkProvider
    // Don't forget to pass the frontendApi prop
    <ClerkProvider publishableKey={clerk_pub_key}>
      <SignedIn>
        <Hello />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </ClerkProvider>
  );
}

function Hello() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { session } = useSession();

  function sayHello() {
    session.getToken().then((token) => {
      console.log(user);
      const bearer = 'Bearer ' + token;
      return fetch('http://localhost:3000/orders', {
        headers: {
          Authorization: bearer,
        },
      }).then(console.log);
    });
  }

  return <button onClick={sayHello}>Click me!</button>;
}

export default App;
