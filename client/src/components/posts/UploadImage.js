import React from "react";
import "./ImageUpload.css";
import { Input, Button } from "@material-ui/core";

const ImageUpload = ({ username }) => {
  // const handleChange = (e) => {
  //   if (e.target.files[0]) {
  //   }
  // };
  // const handleUpload = () => {
  //   const uploadTask = storage.ref(`images/${image.name}`).put(image);
  //   uploadTask.on(
  //     "state_changed",
  //     (snapshot) => {
  //       // progress function ...
  //       const progress = Math.round(
  //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //       );
  //       setProgress(progress);
  //     },
  //     (error) => {
  //       // Error function ...
  //       console.log(error);
  //     },
  //     () => {
  //       // complete function ...
  //       storage
  //         .ref("images")
  //         .child(image.name)
  //         .getDownloadURL()
  //         .then((url) => {
  //           setUrl(url);

  //           axios.post('/upload', {
  //             caption: caption,
  //             user: username,
  //             image: url
  //           });

  //           // post image inside db
  //           db.collection("posts").add({
  //             imageUrl: url,
  //             caption: caption,
  //             username: username,
  //             timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  //           });
  //           setProgress(0);
  //           setCaption("");
  //           setImage(null);
  //         });
  //     }
  //   );
  // };

  return (
    <div className="imageupload">
      {/* <progress className="imageupload__progress" value={progress} max="100" /> */}
      <Input
        placeholder="Enter a caption"
        
      />
      <div>
        <input type="file"  />
        <Button className="imageupload__button" >
          Upload
        </Button>
      </div>
      <br />
    </div>
  );
};

export default ImageUpload;
