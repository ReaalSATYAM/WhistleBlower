const axios = require("axios");
const FormData = require("form-data");

async function uploadToIPFS(fileBuffer, fileName) {
  const data = new FormData();
  data.append("file", fileBuffer, fileName);

  const res = await axios.post(
    "https://api.pinata.cloud/pinning/pinFileToIPFS",
    data,
    {
      headers: {
        ...data.getHeaders(),
        Authorization: `Bearer ${process.env.PINATA_JWT}`,
      },
    }
  );

  return res.data.IpfsHash;
}

module.exports = { uploadToIPFS };
