import React from "react";
import { IonPage, IonContent, IonSlide, IonSlides } from "@ionic/react";
// import SmallHeader from "../components/Header/SmallHeader";
// import LargeHeader from "../components/Header/LargeHeader";
// import LinkList from "../../components/Link/LinkList";
import image1 from "./tabs/tipimages/1.png";
import image2 from "./tabs/tipimages/2.png";
import image3 from "./tabs/tipimages/3.png";
import image4 from "./tabs/tipimages/4.png";
import image5 from "./tabs/tipimages/5.png";
import image6 from "./tabs/tipimages/6.png";
const Tips = (props) => {
  return (
    <IonPage>
      <IonContent fullscreen scroll-y="false" >
        <IonSlides style={{ verticalAlign: "middle", height: "100%" }}>
          <IonSlide style={{backgroundColor:"#050a24"}}>
              <img src={image1} alt="1" />
              {/* <h2>Welcome</h2> */}
              {/* <p>The <b>ionic conference app</b> is a practical preview of the ionic framework in action, and a demonstration of proper code use.</p> */}
          </IonSlide>

          <IonSlide>
            <img src={image2} alt="2" />
            {/* <h2>What is Ionic?</h2>
        <p><b>Ionic Framework</b> is an open source SDK that enables developers to build high quality mobile apps with web technologies like HTML, CSS, and JavaScript.</p> */}
          </IonSlide>

          <IonSlide style={{backgroundColor:"#050a24"}}>
            <img src={image3} alt="3" />
            {/* <h2>What is Ionic Appflow?</h2>
        <p><b>Ionic Appflow</b> is a powerful set of services and features built on top of Ionic Framework that brings a totally new level of app development agility to mobile dev teams.</p> */}
          </IonSlide>

          <IonSlide>
            <img src={image4} alt="4" />
            {/* <h2>What is Ionic Appflow?</h2>
        <p><b>Ionic Appflow</b> is a powerful set of services and features built on top of Ionic Framework that brings a totally new level of app development agility to mobile dev teams.</p> */}
          </IonSlide>

          <IonSlide style={{backgroundColor:"#050a24"}}>
            <img src={image5} alt="5" />
            {/* <h2>What is Ionic Appflow?</h2>
        <p><b>Ionic Appflow</b> is a powerful set of services and features built on top of Ionic Framework that brings a totally new level of app development agility to mobile dev teams.</p> */}
          </IonSlide>

          <IonSlide>
            <img src={image6} alt="6" />
            {/* <h2>Ready to Play?</h2> */}
            {/* <ion-button fill="clear">Continue <ion-icon slot="end" name="arrow-forward"></ion-icon></ion-button> */}
          </IonSlide>

        </IonSlides>
      </IonContent>
    </IonPage>
  );
};

export default Tips;
