import {PDFDocument , StandardFonts} from 'pdf-lib';
import fs from 'fs';
import fontkit from '@pdf-lib/fontkit';
import {itemsData} from "../assets/items.mjs";


export default async function createReceipt(order) {
    const pdfDoc = await PDFDocument.create();
    pdfDoc.registerFontkit(fontkit);
    const fontBytes = fs.readFileSync('./server/assets/GenShinGothic-Regular.ttf');
    const genshinGothic = await pdfDoc.embedFont(fontBytes,{ subset: true });
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const length = order.orderItems.length;
    const page = pdfDoc.addPage([204.1,141+29*length]);
    var { width, height } = page.getSize();
    height = height - 10;
    // const pngImageBytes = fs.readFileSync('./server/assets/reciept-header.png'); //本番環境用
    const pngImageBytes = fs.readFileSync('./server/assets/reciept-header-5mogi-2.png');//5模擬用
    const pngImage = await pdfDoc.embedPng(pngImageBytes);
    page.drawImage(pngImage, {
        x: (204.1-164.41)/2 ,
        y: height - 57,
        width: 164.41,
        height: 57,
    });
    page.setFont(genshinGothic);
    page.setFontSize(8);
    function getTextWidth(font,text,size){
        return font.widthOfTextAtSize(text,size);
    }
    page.drawText("73期高3喫茶班 @5模擬", { x: width/2 - getTextWidth(genshinGothic,"73期高3喫茶班 @5模擬",8)/2, y: height - 65});
    page.drawText("ID : " + order.submitId, { x: width/2 - getTextWidth(helveticaFont,"ID : " + order.submitId,8)/2, y: height - 78 , font: helveticaFont});
    page.drawLine({start: {x: 10, y: height - 82}, end: {x: width-10, y: height - 82}});
    order.orderItems.forEach((v,i) => {
        const item = itemsData.find((item) => item.id === v.itemId);
        page.drawText(item.name, { x: 10, y: height - 82 - 29 * i - 17});
        page.drawText( v.quantity.toString(), { x: 80, y: height - 82 - 29 * i - 29, font: helveticaFont});
        page.drawText("点" , { x: 82 + helveticaFont.widthOfTextAtSize(v.quantity.toString(),8), y: height - 82 - 29 * i - 29});
        page.drawText("¥" + item.price, { x: 50, y: height - 82 - 29 * i - 29, font: helveticaFont});
        page.drawText("¥" + item.price * v.quantity, { x: width - getTextWidth(helveticaFont ,"¥" + item.price * v.quantity ,8) - 10, y: height - 82 - 29 * i - 29, font: helveticaFont});
    });
    page.drawLine({start: {x: 10, y: height - 82 -9 - 29 * order.orderItems.length}, end: {x: width-10, y: height - 82 - 9 - 29 * order.orderItems.length} , dashArray: [2, 2]});
    page.setFontSize(10);
    page.drawText("合計", { x: 10, y: height - 82 - 29 * order.orderItems.length - 29});
    page.drawText("¥" + order.total, { x: width - getTextWidth(helveticaFont ,"¥" + order.total ,10) - 10, y: height - 82 - 29 * order.orderItems.length - 29, font: helveticaFont});
    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync(`./server/tmp/${order.submitId}.pdf`, pdfBytes);
    return pdfBytes;
}

createReceipt({
    "_id": {
      "$oid": "663122ef576d2117707fc592"
    },
    "persons": 3,
    "payment": "cash",
    "orderItems": [
      {
        "itemId": 1,
        "area": "Drink",
        "quantity": 2,
        "orderId": "18f2ff010973c2",
        "isCompleted": true,
        "_id": {
          "$oid": "663122f0576d2117707fc593"
        }
      },
      {
        "itemId": 3,
        "area": "Drink",
        "quantity": 1,
        "orderId": "18f2ff01886310",
        "isCompleted": true,
        "_id": {
          "$oid": "663122f0576d2117707fc594"
        }
      },
      {
        "itemId": 5,
        "area": "Drink",
        "quantity": 1,
        "orderId": "18f2ff02227357",
        "isCompleted": true,
        "_id": {
          "$oid": "663122f0576d2117707fc595"
        }
      },
      {
        "itemId": 4,
        "area": "Drink",
        "quantity": 1,
        "orderId": "18f2ff0254e26b",
        "isCompleted": true,
        "_id": {
          "$oid": "663122f0576d2117707fc596"
        }
      },
      {
        "itemId": 6,
        "area": "Waffle",
        "quantity": 1,
        "orderId": "18f2ff03ca715e",
        "isCompleted": true,
        "_id": {
          "$oid": "663122f0576d2117707fc597"
        }
      },
      {
        "itemId": 11,
        "area": "Qroque_Monsieur",
        "quantity": 1,
        "orderId": "18f2ff044c03b9",
        "isCompleted": true,
        "_id": {
          "$oid": "663122f0576d2117707fc598"
        }
      },
      {
        "itemId": 12,
        "area": "Consomme_Soup",
        "quantity": 1,
        "orderId": "18f2ff0492f105",
        "isCompleted": true,
        "_id": {
          "$oid": "663122f0576d2117707fc599"
        }
      }
    ],
    "total": 2100,
    "submitId": "18f2ff07d902bd",
    "isServed": true,
    "tableNum": 12,
    "createdAt": {
      "$date": "2024-04-30T16:57:20.083Z"
    },
    "updatedAt": {
      "$date": "2024-05-01T03:39:24.562Z"
    },
    "__v": 0
  });