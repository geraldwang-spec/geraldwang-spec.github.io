const random_url = "";
const API_URL = "https://" + random_url + "trycloudflare.com";
async function connectToApi() {
  try {
    console.log("my test log")
    // const response = await fetch(`{API_URL}`, {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json"
    //   }
    // });
    //
    // const data = await response.json();
    // console.log("from API get datas:", data);
    // document.getElementById("apple").innerText = JSON.stringify(data);

  } catch (error) {
    console.error("connection fail", error)
  }

}
