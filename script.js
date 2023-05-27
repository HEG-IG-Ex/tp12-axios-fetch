async function fetchRndImg() {
	const settings = {
		method: "GET", // *GET, POST, PUT, DELETE, etc.
		//mode: "no-cors", // no-cors, *cors, same-origin
		cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
		credentials: "omit", //"same-origin", // include, *same-origin, omit
		headers: {
			"Content-Type": "application/json",
			// 'Content-Type': 'application/x-www-form-urlencoded',
		},
	};
	const response = await fetch(
		"https://picsum.photos/v2/list?page=1&limit=30",
		settings
	);
	const jsonData = await response.json();
	return jsonData;
}

async function turnGray(id) {
	// Make a request for a user with a given ID
	return await axios
		.get(`https://picsum.photos/id/${id}/200/300?grayscale`, {
			responseType: "blob",
		})
		.then(function (response) {
			// handle success
			console.log(response);
            return response["data"];
		})
		.catch(function (error) {
			// handle error
			console.log(error);
			return null;
		});
}

/*document
		.getElementById(id)
		.setAttribute("url", URL.createObjectURL(response["data"]));*/

function buildRndImgGallery(imgDiv) {
	let output = "";
	fetchRndImg().then((res) => {
		res.forEach((element) => {
			let id = element["id"];
			let img = document.createElement("img");
			img.setAttribute("id", `${id}`);
			img.setAttribute("src", `${element["download_url"]}`);

			img.addEventListener("click", async (_) => {
                let blob = await turnGray(id);
                document.getElementById(`${id}`).setAttribute("src", URL.createObjectURL(blob));
            });
            
			imgDiv.appendChild(img);
		});
	});
	return output;
}

const btnLoad = document.getElementById("btnLoad");
const images = document.getElementById("images");

btnLoad.addEventListener("click", (_) => buildRndImgGallery(images));
