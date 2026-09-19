import TiltedLaptop from "./TiltedLaptop";
import DemoScreen from "./DemoScreen";

export default function DemoLaptop() {
  return (
    <TiltedLaptop
      content={<DemoScreen />}
      caption="Live monitoring, an explainable AI summary, and forecast — in one screen."
    />
  );
}