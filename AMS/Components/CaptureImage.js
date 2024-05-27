import { Camera, CameraView, useCameraPermissions } from "expo-camera";
import { useState, useRef } from "react";
import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import Base64Image from "./ViewImage";

export default function CaptureImage() {
  let cameraRef = useRef();
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [capturedImage, setCapturedImage] = useState(null);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

 if(capturedImage != null) {
  console.log("captured image uri and capturedImage state variable is ", capturedImage, typeof(capturedImage), capturedImage==null)
 }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }


function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const takePicture = async () => {
      console.log("i m here");
      const options = { quality: 1, base64: true, exif: false};
      const data = await cameraRef.current.takePictureAsync(options);
      setCapturedImage(data); // Here you can handle the captured picture, e.g., setImage(data.uri)
  };

  return (
    <View style={styles.container}>
      {capturedImage != null  && <Base64Image base64Data={capturedImage.base64} />}
      {capturedImage == null && (
          <CameraView
            style={styles.camera}
            facing={facing}
            ref={cameraRef}
          >
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={toggleCameraFacing}
              >
                <Text style={styles.text}>Flip Camera</Text>
              </TouchableOpacity>
              <Pressable onPress={takePicture} style={{ top: 680 }}>
                <Text style={{ color: "#fff", fontSize: 24, fontWeight: 800 }}>
                  Take photo
                </Text>
              </Pressable>
            </View>
          </CameraView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
