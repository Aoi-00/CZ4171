import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg, IonFab, IonFabButton, IonIcon, IonGrid, IonRow, IonCol, IonToast } from '@ionic/react';
import React, { Component, useState } from 'react';
import { camera, send } from 'ionicons/icons';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';

const Home = () => {
  const postImg = () => {
    let postData = {
      'image': data
    }
    fetch('http://192.168.18.220:5000/', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(postData)
    })
      .then(res => res.json())
      .then((results) => {
        setResults(results)
      })
  }

  const [photos, setPhotos] = useState<any>();
  const [data, setData] = useState<any>();
  const [results, setResults] =useState<any>({ Results: '', Probability: ''});
  const [showToast1, setShowToast1] = useState(false);
  const takePhoto = async () => {
    const photo = Camera.getPhoto({
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
      quality: 100,
    }).then(photo => {
      let image_url = `data:image/jpeg;base64,${photo.base64String}`;
      setPhotos(image_url)
      setData(photo.base64String)
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
        {photos && <IonImg src={photos} />}
        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonRow>
            <IonCol>
              <IonFabButton onClick={() => takePhoto()}>
                <IonIcon icon={camera}></IonIcon>
              </IonFabButton>
            </IonCol>
            <IonCol>
              <IonFabButton onClick={() => {postImg(); setShowToast1(true);}}>
                <IonIcon icon={send}></IonIcon>
              </IonFabButton>
            </IonCol>
            { results.Result !== undefined && <IonToast
              isOpen={showToast1}
              onDidDismiss={() => setShowToast1(false)}
              message={`Results: ${results.Result} Probability: ${results.Probability}`}
              duration={300}
            />}
          </IonRow>
        </IonFab>
      </IonContent>
    </IonPage>
  </div>;
}

export default Home;
