import { motion } from "framer-motion";

// Open-laptop mockup in the TimeMax style: notch + camera pill, diagonal
// glare sweep, base lip, and a keyboard deck projected flat with
// perspective(980px) rotateX(54deg). Content fills the screen full-bleed.
const KEY_ROWS = [14, 13, 12, 8];

export default function LaptopMockup({ content, caption }) {
  return (
    <div className="laptop-mockup">
      <div className="laptop-mockup__glow" aria-hidden="true" />
      <div className="laptop-mockup__stage">
        <motion.div
          className="laptop-mockup__body"
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.div
            className="laptop-mockup__float"
            animate={{
              y: [0, -12, 0],
              rotateX: [-10, -8.5, -10],
              rotateY: [-17, -15.5, -17],
            }}
            transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="laptop-mockup__shell">
            <div className="laptop-mockup__screen">
              <div className="laptop-mockup__glare" aria-hidden="true" />
              <span className="laptop-mockup__notch">
                <span className="laptop-mockup__camera" />
              </span>
              <div className="laptop-mockup__display">{content}</div>
            </div>
          </div>

          <div className="laptop-mockup__deck" aria-hidden="true">
            <div className="laptop-mockup__keyboard">
              {KEY_ROWS.map((keys, rowIndex) => (
                <div
                  key={rowIndex}
                  className="laptop-mockup__keyrow"
                  style={{ gridTemplateColumns: `repeat(${keys}, 1fr)` }}
                >
                  {Array.from({ length: keys }).map((_, k) => (
                    <span key={k} className="laptop-mockup__key" />
                  ))}
                </div>
              ))}
            </div>
            <div className="laptop-mockup__trackpad" />
          </div>
          </motion.div>
        </motion.div>
      </div>

      {caption && <p className="laptop-mockup__caption">{caption}</p>}
    </div>
  );
}