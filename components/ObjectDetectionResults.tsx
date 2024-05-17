import React from 'react';
import { Stage, Layer, Rect, Text, Image as KonvaImage } from 'react-konva';
import useImage from 'use-image';

interface BoundingBox {
  left: number;
  top: number;
  width: number;
  height: number;
}

interface Prediction {
  probability: number;
  tagName: string;
  boundingBox: BoundingBox;
}

interface ObjectDetectionResultsProps {
  imageUrl: string;
  predictions: Prediction[];
}

const ObjectDetectionResults: React.FC<ObjectDetectionResultsProps> = ({ imageUrl, predictions }) => {
  const [image] = useImage(imageUrl);

  return (
    <Stage width={image ? image.width : 800} height={image ? image.height : 600}>
      <Layer>
        {image && <KonvaImage image={image} />}
        {predictions.map((prediction, index) => (
          <React.Fragment key={index}>
            <Rect
              x={prediction.boundingBox.left * (image ? image.width : 800)}
              y={prediction.boundingBox.top * (image ? image.height : 600)}
              width={prediction.boundingBox.width * (image ? image.width : 800)}
              height={prediction.boundingBox.height * (image ? image.height : 600)}
              stroke="red"
              strokeWidth={2}
            />
            <Text
              x={prediction.boundingBox.left * (image ? image.width : 800)}
              y={prediction.boundingBox.top * (image ? image.height : 600) - 20}
              text={`${prediction.tagName} (${(prediction.probability * 100).toFixed(2)}%)`}
              fontSize={16}
              fill="red"
            />
          </React.Fragment>
        ))}
      </Layer>
    </Stage>
  );
};

export default ObjectDetectionResults;
