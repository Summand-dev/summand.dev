import { isArray, isObject } from "lodash";

async function downloadFile(data: Blob, filename: string) {
  var base64 = btoa(unescape(encodeURIComponent(data)));
  const href = await URL.createObjectURL(data);
  console.log(href);
  const link = document.createElement("a");
  link.href = href;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function downloadTXT(object: any, filename: string) {
  const replacer = (key, value) => (value === null ? "" : value); // specify how you want to handle null values here
  const header = Object.keys(object[0]);
  const csv = [
    ...object.map((row) =>
      header
        .map(
          (fieldName) =>
            fieldName +
            " :" +
            (isArray(row[fieldName]) || isObject(row[fieldName])
              ? JSON.stringify(row[fieldName], replacer)
              : row[fieldName])
        )
        .join("\r\n")
    ),
  ].join("\r\n------------------\r\n");
  var myblob = new Blob([csv], {
    type: "text/plain;charset=utf-8",
  });
  downloadFile(myblob, filename + ".txt");
}

export function downloadCSV(object: any, filename: string) {
  const replacer = (key, value) => (value === null ? "" : value); // specify how you want to handle null values here
  const header = Object.keys(object[0]);
  const csv = [
    header.join(","), // header row first
    ...object.map((row) =>
      header
        .map((fieldName) =>
          isArray(row[fieldName]) || isObject(row[fieldName])
            ? '"' +
              JSON.stringify(row[fieldName], replacer).replace(/"/g, "'") +
              '"'
            : row[fieldName]
        )
        .join(",")
    ),
  ].join("\r\n");
  var myblob = new Blob([csv], {
    type: "text/csv;charset=utf-8",
  });
  downloadFile(myblob, filename + ".csv");
}

export function downloadXML(object: any, filename: string) {
  const replacer = (key, value) => (value === null ? "" : value); // specify how you want to handle null values here
  const header = Object.keys(object[0]);
  const csv =
    [
      ...object.map(
        (row) =>
          "<row>\r\n" +
          header
            .map(
              (fieldName) =>
                " <" +
                fieldName +
                ">" +
                (isArray(row[fieldName]) || isObject(row[fieldName])
                  ? JSON.stringify(row[fieldName], replacer)
                  : row[fieldName]) +
                "</" +
                fieldName +
                ">"
            )
            .join("\r\n")
      ),
    ].join("\r\n</row>\r\n") + "\r\n</row>";
  var myblob = new Blob([csv], {
    type: "text/xml;charset=utf-8",
  });
  downloadFile(myblob, filename + ".xml");
}

export function downloadJSON(object: any, filename: string) {
  var myblob = new Blob([JSON.stringify(object)], {
    type: "application/json;charset=utf-8",
  });
  downloadFile(myblob, filename + ".json");
}

export function downloadFileByType(
  object: any,
  type: string,
  filename: string
) {
  switch (type) {
    case "txt":
      downloadTXT(object, filename);
      break;
    case "csv":
      downloadCSV(object, filename);
      break;
    case "xml":
      downloadXML(object, filename);
      break;
    case "json":
      downloadJSON(object, filename);
      break;
  }
}
