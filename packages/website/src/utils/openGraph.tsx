import sharp from "sharp";
import { readFile } from "node:fs/promises";
import satori, { type SatoriOptions } from "satori";

export interface OgData {
  title: string;
  author: string;
  lang: string;
  date: Date | string;
}

const BASE64_LOGO = 'data:image/png;base64,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'

/**
 * Opengraph template to generate svg
 */
const Template = (props: OgData) => (
  <div
    style={{
      height: "100%",
      width: "100%",
      display: "flex",
      backgroundColor: "white",
      backgroundSize: "100px 100px",
      fontFamily: "Inter Regular",
    }}
  >
    <div
      style={{
        padding: "20px",
        display: "flex",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "stretch",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: "10px",
        }}
      >
        <div
          style={{
            fontSize: "32px",
            fontWeight: "900",
            lineHeight: "3rem",
            padding: "10px 0 50px 0",
            color: "#374151",
            flex: 1,
            display: "flex",
            fontFamily: "Inter SemiBold",
          }}
        >
          {props.title}
        </div>
        <div
          style={{
            fontSize: "16px",
            fontWeight: "900",
            color: "#374151",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            {typeof props.date === 'string' ? props.date : props.date.toLocaleDateString(props.lang, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ marginRight: "8px" }}>{props.author}</span>
            <img src={BASE64_LOGO} width={32} height={32} />
          </div>
        </div>
      </div>
    </div>
  </div>
);

/**
 * generate filename / path for generated OG images
 *
 * @param filename filename in asset folder
 * @returns
 */
export const getOgImagePath = (filename: string = 'aleksandrov') => {
  if (filename.startsWith("/")) filename = filename.substring(1);

  if (filename.endsWith("/"))
    filename = filename.substring(0, filename.length - 1);

  if (filename === "") filename = 'aleksandrov';

  return `./open-graph/${filename}.png`;
};

/**
 * generate opengraph image with satori and return a buffer
 *
 * @param text
 */
const generateOgImage = async (
  props: OgData
): Promise<Buffer> => {
  const options: SatoriOptions = {
    width: 600,
    height: 315,
    embedFont: true,
    fonts: [
      {
        name: "Inter SemiBold",
        data: await readFile("./src/assets/fonts/Inter-SemiBold.ttf"),
        weight: 600,
        style: "normal",
      },
      {
        name: "Inter Regular",
        data: await readFile("./src/assets/fonts/Inter-Regular.ttf"),
        weight: 600,
        style: "normal",
      }
    ],
  };

  const svg = await satori(
    Template(props),
    options
  );

  const sharpSvg = Buffer.from(svg);
  const buffer = await sharp(sharpSvg).toBuffer();

  return buffer;
};

export default generateOgImage;
