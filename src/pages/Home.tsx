import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg, IonFab, IonFabButton, IonIcon, IonGrid, IonRow, IonCol } from '@ionic/react';
import React, { Component, useState } from 'react';
import { camera, trash, close } from 'ionicons/icons';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';


const Home = () => {
  const [photos, setPhotos] = useState<any>([]);
  const takePhoto = async () => {
    const photo = Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });
    let image_url = `data:image/jpeg:base64,${(await photo).base64String}`;
    setPhotos(image_url)
  };

  return <div>
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Photo</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {photos && <IonImg src={photos}/>}
        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonFabButton onClick={() => takePhoto()}>
            <IonIcon icon={camera}></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  </div>;
}

export default Home;
