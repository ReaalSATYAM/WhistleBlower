const axios = require("axios");
const FormData = require("form-data");

async function transferToIPFS(fileContent, fileLabel) {
  const payload = new FormData();
  payload.append("file", fileContent, fileLabel);

  const result = await axios.post(
    "https://api.pinata.cloud/pinning/pinFileToIPFS",
    payload,
    {
      headers: {
        ...payload.getHeaders(),
        Authorization: `Bearer ${process.env.PINATA_JWT}`,
      },
    }
  );

  return result.data.IpfsHash;
}

module.exports = { uploadToIPFS: transferToIPFS };
