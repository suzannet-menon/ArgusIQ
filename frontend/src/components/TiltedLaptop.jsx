import { motion } from "framer-motion";

const KEY_ROWS = 4;
const KEYS_PER_ROW = 14;

export default function TiltedLaptop({ content, caption }) {
  return (
    <div className="tilted-laptop">
      <motion.div
        className="tilted-laptop__stage"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="tilted-laptop__body">
          <div className="tilted-laptop__screen">
            <span className="tilted-laptop__camera" aria-hidden="true" />
            <span className="tilted-laptop__led" aria-hidden="true" />
            <div className="tilted-laptop__display">
              <div className="tilted-laptop__scale origin-top-left scale-[0.62] sm:scale-[0.78] lg:scale-100">
                <div className="h-[1010px] w-[1620px] sm:h-full sm:w-full">{content}</div>
              </div>
            </div>
            <span className="tilted-laptop__brand">ArgusIQ</span>
          </div>
          <div className="tilted-laptop__deck">
            <div className="tilted-laptop__keys" aria-hidden="true">
              {Array.from({ length: KEY_ROWS }).map((_, row) => (
                <div className="tilted-laptop__keyrow" key={row}>
                  {Array.from({ length: KEYS_PER_ROW }).map((_, key) => (
                    <span className="tilted-laptop__key" key={key} />
                  ))}
                </div>
              ))}
            </div>
            <div className="tilted-laptop__trackpad" aria-hidden="true" />
          </div>
        </div>
      </motion.div>
      {caption && (
        <p className="tilted-laptop__caption">{caption}</p>
      )}
    </div>
  );
}