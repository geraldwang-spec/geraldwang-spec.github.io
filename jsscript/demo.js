const random_url = "licensed-insights-indicated-competitive";
const API_URL = "https://" + random_url + ".trycloudflare.com";
async function connectToApi() {
  try {
    console.log("my test log")
    const response = await fetch(API_URL + "/test01", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await response.json();
    console.log("from API get datas:", data);
    document.getElementById("apple").innerText = JSON.stringify(data);

  } catch (error) {
    console.error("connection fail", error);
  }

}

async function stocks_price() {
  try {
    const response = await fetch(API_URL + "/stocks_price");
    const data = await response.json();
    console.log(data.message);

    const listContainer = document.getElementById('stocks_list')

    const htmlContent = data.map(data => `
      < tr >
        <td>${data.number}</td>
        <td>${data.id}</td>
        <td>${data.name}</td>
        <td>${data.price}</td>
      </tr >
      `).join();

    listContainer.innerHTML = htmlContent

  } catch (error) {
    console.error("get fail:", error);
  }
}
