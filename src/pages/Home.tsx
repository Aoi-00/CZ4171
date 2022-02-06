import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg, IonFab, IonFabButton, IonIcon, IonGrid, IonRow, IonCol } from '@ionic/react';
import React, { Component, useState } from 'react';
import { camera } from 'ionicons/icons';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';

const postImg = (postData : any) => (dispatch:any) => {
  fetch('http://127.0.0.1:5000/', {
      method: 'POST',
      headers: {
          'content-type': 'application/json'
      },
      body: JSON.stringify(postData)
  })
      .then(res => {res.json(); console.log(res)})
      .then(data => console.log(data))
      // .then(data => {
      //     dispatch({
      //         type: 'PREDICTION',
      //         payload: data
      //     })
      // })
}

const Home = () => {
  const [photos, setPhotos] = useState<any>();
  const takePhoto = async () => {
    const photo = Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 100,
    }).then(photo=>{
      
      let image_url = `data:image/jpeg;base64,${photo.base64String}`;
      setPhotos(image_url)
      console.log(photo.base64String)
      postImg({
        image: photo.base64String
      })
    });
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
