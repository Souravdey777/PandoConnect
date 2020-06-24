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
          </IonSlide>

          <IonSlide>
            <img src={image2} alt="2" />
          </IonSlide>

          <IonSlide style={{backgroundColor:"#050a24"}}>
            <img src={image3} alt="3" />
          </IonSlide>

          <IonSlide>
            <img src={image4} alt="4" />
          </IonSlide>

          <IonSlide style={{backgroundColor:"#050a24"}}>
            <img src={image5} alt="5" />
          </IonSlide>

          <IonSlide>
            <img src={image6} alt="6" />
          </IonSlide>

        </IonSlides>
      </IonContent>
    </IonPage>
  );
};

export default Tips;
