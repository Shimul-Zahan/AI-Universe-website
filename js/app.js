

const fetching = async () => {
    const fetching = await fetch('https://openapi.programming-hero.com/api/ai/tools');
    const data = await fetching.json();
    const allData = await data.data.tools;
    // console.log(allData[0].published_in);

    const sortData = allData.sort(function (a, b) {
        const date1 = new Date(a.published_in);
        const date2 = new Date(b.published_in);
        return date2 - date1;
    })

    console.log(sortData)
    displayData(sortData);
}
// !add item using join to html element in map function...
const displayData = (allData) => {
    const parent = document.getElementById('parent');
    allData.forEach((data, index) => {
        // console.log(data.id)
        const div = document.createElement('div');
        div.classList = `card w-96 bg-base-100 shadow-xl`;
        div.innerHTML = `
            <figure class="px-10 pt-10">
                <img src="${data.image ? data.image : 'No image found'}" class="rounded-xl" />
            </figure>
            <div id="features" class="p-4">
            <h1 class="text-3xl font-medium">Features</h1>
            <ol>
                ${data.features.map((item, index) => `<li>${index + 1}. ${item}</li>`).join('')}
            </ol>
            </div>
            <div class="items-center text-center p-4">
                <div class="flex justify-between items-center">
                    <div>
                        <button class="btn btn-outline btn-primary">${data.name}</button>
                        <div>
                            <p>${data.published_in}</p>
                        </div>
                    </div>
                    <button onclick="singleData('${data.id}')" class="btn btn-outline btn-primary">-></button>
                </div>
            </div>
        `;
        parent.appendChild(div);
    });
}


const singleData = async (id) => {
    // console.log(id);
    const fetchingSingleData = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`);
    const singledata = await fetchingSingleData.json();
    // console.log(singledata);

    openModal(singledata);
}

const openModal = (singledata) => {
    my_modal.showModal();
    // ! convert futures object to array
    const featureArray = Object.values(singledata.data.features);

    document.getElementById('modal-div').innerHTML = `
        <div class="space-y-2">
            <h1 class="text-3xl text-center font-medium text-black">${singledata.data.description}</h1>
            <div class="flex justify-center items-center">
                <img class="h-[400px]" src="${singledata.data.image_link[0]}">
            </div>
            <h1 class="text-4xl font-medium text-center text-black">${singledata.data.input_output_examples[0].input}</h1>
            <h1 class="text-xl font-medium text-center text-black">${singledata.data.input_output_examples[0].output}</h1>
            <div>
                <h1>Pricing</h1>
                ${singledata.data.pricing.map((item, index) => `<li>${item.plan}, ${item.price}</li>`).join('')}
            </div>
            <div>
                <h1>Intregrations</h1>
                ${singledata.data.integrations.map((item, index) => `<li>${item}</li>`).join('')}
            </div>
            <div>
                <h1>Features</h1>
                ${featureArray.map((item, index) => `<li>${item.feature_name}</li>`).join('')}
            </div>
        </div>
        <div class="modal-action">
            <button class="btn">Close</button>
        </div>
    `
}

fetching();