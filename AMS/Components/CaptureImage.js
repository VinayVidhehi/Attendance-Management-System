import { useState, useRef } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { useCameraPermissions, CameraView } from "expo-camera";
import Base64Image from "./ViewImage";

export default function CaptureImage() {
  let cameraRef = useRef();
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [capturedImage, setCapturedImage] = useState(null);
  const [loading, setLoading] = useState(false); // State to manage loading

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (capturedImage != null) {
    console.log(
      "captured image uri and capturedImage state variable is ",
      capturedImage,
      typeof capturedImage,
      capturedImage == null
    );
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const takePicture = async () => {
    setLoading(true);
    const options = { quality: 1, base64: true, exif: false };
    const data = await cameraRef.current.takePictureAsync(options);
    setCapturedImage(data); // Here you can handle the captured picture, e.g., setImage(data.uri)
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {capturedImage != null && (
        <Base64Image base64Data={capturedImage.base64} />
      )}
      {capturedImage == null && (
        <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
          <View style={styles.buttonContainer}>
            <View style={styles.buttonWrapper}>
              <TouchableOpacity
                style={styles.button}
                onPress={toggleCameraFacing}
              >
                <Text style={styles.text}>Flip Camera</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={takePicture} style={styles.button}>
                {!loading && <Text style={styles.text}>Take Photo</Text>}
                {loading && <ActivityIndicator size="small" color="#fff" />}
              </TouchableOpacity>
            </View>
          </View>
        </CameraView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  permissionText: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 16,
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    alignItems: "center",
  },
  buttonWrapper: {
    flexDirection: "row",
    width: "80%",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    borderWidth: 1,
    borderColor: "white",
    marginHorizontal: 10,
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
