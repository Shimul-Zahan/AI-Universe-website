

const fetching = async () => {
    const fetching = await fetch('https://openapi.programming-hero.com/api/ai/tools');
    const data = await fetching.json();
    const allData = await data.data.tools
    displayData(allData);
}

const displayData = (allData) => {
    const parent = document.getElementById('parent');
    allData.forEach((data, index) => {
        console.log(index)
        const div = document.createElement('div');
        div.classList = `card w-96 bg-base-100 shadow-xl`;
        div.innerHTML = `
            <figure class="px-10 pt-10">
                <img src="${data.image}" alt="Shoes" class="rounded-xl" />
            </figure>
            <div id="features" class="p-4">
            <h1 class="text-3xl font-medium">Features</h1>
            <ol>
            // !add item using join to html element in map function...
                ${data.features.map((item, index) => `<li>${index + 1}. ${item}</li>`).join('')}
            </ol>
            </div>
            <div class="items-center text-center p-4">
                <div class="flex justify-between items-center">
                    <div>
                        <button class="btn btn-outline btn-primary">${data.name}</button>
                        <p>${data.published_in}</p>
                    </div>
                    <button class="btn btn-outline btn-primary">-></button>
                </div>
            </div>
        `;
        parent.appendChild(div);
    });
}

fetching();