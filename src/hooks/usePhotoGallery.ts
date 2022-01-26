import { useState, useEffect } from 'react';
import { isPlatform } from '@ionic/react';

import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Storage } from '@capacitor/storage';
import { Capacitor } from '@capacitor/core';

export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
}

export default function usePhotoGallery() {
  // const [photos, setPhotos] = useState<UserPhoto[]>([]);
  const [photos, setPhotos] = useState<any>([]);
  const takePhoto = async () => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });
    let image_url = `data:image/jpeg:base64,${(await photo).base64String}`;
    setPhotos(image_url)
    // const fileName = new Date().getTime() + '.jpeg';
    // const newPhotos = [
    //   {
    //     filepath: fileName,
    //     webviewPath: photo.webPath,
    //   },
    //   ...photos,
    // ];
    // setPhotos(newPhotos);
  };

  return {
    photos,
    takePhoto,
  };
}