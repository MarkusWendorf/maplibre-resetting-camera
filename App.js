import { StyleSheet } from "react-native";
import {
  Camera,
  Images,
  MapView,
  ShapeSource,
  SymbolLayer,
} from "@maplibre/maplibre-react-native";
import { useState, useRef } from "react";

export default function App() {
  const cameraRef = useRef();
  const [features, setFeatures] = useState({
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [12, 54],
        },
        properties: {},
        id: "feature-id-1",
      },
    ],
  });

  const updateFeatures = () => {
    setFeatures({
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [12, 54],
          },
          properties: {},
          id: "feature-id-1",
        },

        {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [12.5, 54],
          },
          properties: {},
          id: "feature-id-2",
        },
      ],
    });
  };

  return (
    <MapView style={{ flex: 1 }}>
      <Camera ref={cameraRef} />
      <Images images={{ default: require("./assets/icon.png") }} />
      <ShapeSource
        shape={features}
        onPress={(evt) => {
          const feature = evt.features[0];
          if (!feature) return;

          cameraRef.current.setCamera({
            zoomLevel: 7,
            animationMode: "linearTo",
            centerCoordinate: feature.geometry.coordinates,
          });

          // Move the map anywhere and after updating the features the camera snaps back to the setCamera call above
          setTimeout(() => updateFeatures(), 5000);
        }}
      >
        <SymbolLayer
          id="marker-layer"
          style={{
            iconImage: "default",
            iconAllowOverlap: true,
            iconSize: 0.01,
          }}
        />
      </ShapeSource>
    </MapView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
