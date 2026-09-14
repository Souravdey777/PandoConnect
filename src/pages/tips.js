import React from "react";
import { IonPage, IonContent, IonButton, IonIcon } from "@ionic/react";
import {
  personCircleOutline,
  createOutline,
  heartOutline,
  sunnyOutline,
} from "ionicons/icons";
import NavHeader from "../components/Header/NavHeader";

const STEPS = [
  {
    icon: personCircleOutline,
    title: "Join the community",
    text: "Sign in with Google to become part of a global community fighting COVID-19 together.",
  },
  {
    icon: createOutline,
    title: "Share your story",
    text: "Post about your recovery, your experience, or a simple message of hope — with a photo if you like.",
  },
  {
    icon: heartOutline,
    title: "Support each other",
    text: "Upvote and comment to lift people up, and browse Trending for the most uplifting stories.",
  },
  {
    icon: sunnyOutline,
    title: "Spread positivity",
    text: "Every story adds a little more hope. Together we remind each other that people recover and come through.",
  },
];

const Tips = () => {
  return (
    <IonPage>
      <NavHeader title="How it works" />
      <IonContent>
        <div className="howto">
          <img className="howto__hero" src="/assets/hero.png" alt="PandoConnect" />
          <h1 className="howto__title">How PandoConnect works</h1>
          <p className="howto__lead">
            A place to share and read stories of recovery, hope, and support.
          </p>

          <ol className="howto__steps">
            {STEPS.map((step, i) => (
              <li className="howto-step" key={i}>
                <span className="howto-step__badge">
                  <IonIcon icon={step.icon} aria-hidden="true" />
                </span>
                <div className="howto-step__body">
                  <h3 className="howto-step__title">
                    <span className="howto-step__num">{i + 1}.</span> {step.title}
                  </h3>
                  <p className="howto-step__text">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <IonButton expand="block" routerLink="/submit" color="primary">
            Share your story
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tips;
