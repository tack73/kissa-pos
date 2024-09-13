import { Link } from "react-router-dom";
import styles from "./complete.module.css";
import axios from "axios";
import { PDFDocument, StandardFonts } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import itemsData from "../../utilities/items.mjs";

async function createReceipt(order) {
  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);
  const fontBytes = await fetch("/GenShinGothic-Regular.ttf").then((res) =>
    res.arrayBuffer()
  ); //本番環境用
  const genshinGothic = await pdfDoc.embedFont(fontBytes, { subset: true });
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const length = order.orderItems.length;
  const page = pdfDoc.addPage([204.1, 141 + 29 * length]);
  var { width, height } = page.getSize();
  height = height - 10;
  const pngImageBytes = await fetch(`/img/reciept-header.png`).then((res) =>
    res.arrayBuffer()
  ); //本番環境用
  // const pngImageBytes = fs.readFileSync('/server/assets/reciept-header-5mogi.png');//5模擬用
  const pngImage = await pdfDoc.embedPng(pngImageBytes);
  page.drawImage(pngImage, {
    x: (204.1 - 164.41) / 2,
    y: height - 57,
    width: 164.41,
    height: 57,
  });
  page.setFont(genshinGothic);
  page.setFontSize(8);
  function getTextWidth(font, text, size) {
    return font.widthOfTextAtSize(text, size);
  }
  page.drawText("73期高3喫茶班 @5模擬", {
    x: width / 2 - getTextWidth(genshinGothic, "73期高3喫茶班 @5模擬", 8) / 2,
    y: height - 65,
  });
  page.drawText("ID : " + order.submitId, {
    x: width / 2 - getTextWidth(helveticaFont, "ID : " + order.submitId, 8) / 2,
    y: height - 78,
    font: helveticaFont,
  });
  page.drawLine({
    start: { x: 10, y: height - 82 },
    end: { x: width - 10, y: height - 82 },
  });
  order.orderItems.forEach((v, i) => {
    const item = itemsData.find((item) => item.id === v.itemId);
    page.drawText(item.name, { x: 10, y: height - 82 - 29 * i - 17 });
    page.drawText(v.quantity.toString(), {
      x: 80,
      y: height - 82 - 29 * i - 29,
      font: helveticaFont,
    });
    page.drawText("点", {
      x: 82 + helveticaFont.widthOfTextAtSize(v.quantity.toString(), 8),
      y: height - 82 - 29 * i - 29,
    });
    page.drawText("¥" + item.price, {
      x: 50,
      y: height - 82 - 29 * i - 29,
      font: helveticaFont,
    });
    page.drawText("¥" + item.price * v.quantity, {
      x:
        width -
        getTextWidth(helveticaFont, "¥" + item.price * v.quantity, 8) -
        10,
      y: height - 82 - 29 * i - 29,
      font: helveticaFont,
    });
  });
  page.drawLine({
    start: { x: 10, y: height - 82 - 9 - 29 * order.orderItems.length },
    end: { x: width - 10, y: height - 82 - 9 - 29 * order.orderItems.length },
    dashArray: [2, 2],
  });
  page.setFontSize(10);
  page.drawText("合計", {
    x: 10,
    y: height - 82 - 29 * order.orderItems.length - 29,
  });
  page.drawText("¥" + order.total, {
    x: width - getTextWidth(helveticaFont, "¥" + order.total, 10) - 10,
    y: height - 82 - 29 * order.orderItems.length - 29,
    font: helveticaFont,
  });
  const dataUri = await pdfDoc.saveAsBase64({ dataUri: true });

  return dataUri;
}

export default function Complete({ init, submitId, order }) {
  function printReceipt() {
    axios.get(
      `https://informed-chief-stork.ngrok-free.app/api/orders/reciept/${submitId}`,
      { headers: { "ngrok-skip-browser-warning": "something" } },
    );
    // createReceipt(order).then((dataUri) => {
    //   const printData = encodeURIComponent(dataUri);
    //   const successURL = window.location.href;
    //   const urlData = `tmprintassistant://tmprintassistant.epson.com/print?ver=1&data-type=pdf&data=${printData}&success=${encodeURIComponent(
    //     successURL
    //   )}`;
    //   window.location.href = urlData;
    //   window.close();
    // });
    // axios
    //   .get(`/api/orders/receipt/${submitId}`, { responseType: "pdf" })
    //   .then((response) => {
    //     console.log(response.data);
    //     const printData = encodeURIComponent(response.data);
    //     const successURL = window.location.href;
    //     const urlData = `tmprintassistant://tmprintassistant.epson.com/print?ver=1&data-type=pdf&data=${printData}&success=${encodeURIComponent(
    //       successURL
    //     )}`;
    //     window.location.href = urlData;
    //   });
  }

  return (
    <div className={styles.completePage}>
      <h1 className={styles.title}>注文が完了しました</h1>
      <div className={styles.buttons}>
        <button onClick={printReceipt}>レシート印字</button>
        <Link to="/pos">
          <button onClick={init}>新規注文</button>
        </Link>
      </div>
    </div>
  );
}
