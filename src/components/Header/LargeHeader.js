import React from "react";
import { IonHeader, IonToolbar, IonTitle } from "@ionic/react";

const LargeHeader = ({ title, subtitle }) => {
  return (
    <IonHeader collapse="condense">
      <IonToolbar>
        <IonTitle size="large">{title}</IonTitle>
      </IonToolbar>
      {subtitle && (
        <IonToolbar>
          <p className="app-subtitle" style={{ paddingInline: "16px" }}>
            {subtitle}
          </p>
        </IonToolbar>
      )}
    </IonHeader>
  );
};

export default LargeHeader;
