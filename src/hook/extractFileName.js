//! Funzione per estrarre il nome del file
const extractFileName = (url) => {
  let name = url || "";
  let parts = name.split("/");
  let lastPart = parts.pop();
  let index = lastPart.indexOf(".pdf") + 4;

  if (index > 3) {
    let fileName = lastPart.substring(0, index);
    fileName =
      fileName.charAt(0).toUpperCase() + fileName.slice(1).toLowerCase();
    return fileName;
  } else {
    return lastPart.charAt(0).toUpperCase() + lastPart.slice(1).toLowerCase();
  }
};

export default extractFileName;
