// NPM
import React, { lazy, Suspense, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { createGenerateClassName, StylesProvider } from "@material-ui/core";

// User Defined
import Header from "./components/Header";

const MarketingApp = lazy(() => import("./components/MarketingApp"));
const AuthApp = lazy(() => import("./components/AuthApp"));

const generateClassName = createGenerateClassName({
  productionPrefix: "co",
});

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <StylesProvider generateClassName={generateClassName}>
          <Header
            onSignOut={() => setIsSignedIn(false)}
            isSignedIn={isSignedIn}
          />
          <Switch>
            <Route path="/auth">
              <AuthApp onSignIn={() => setIsSignedIn(true)} />
            </Route>
            <Route path="/">
              <MarketingApp />
            </Route>
          </Switch>
        </StylesProvider>
      </Suspense>
    </BrowserRouter>
  );
};
