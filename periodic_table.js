document.addEventListener("DOMContentLoaded", function () {
    const periodicTable = document.querySelector(".periodic-table");
    const searchInput = document.createElement("input");
    searchInput.setAttribute("type", "text");
    searchInput.setAttribute("placeholder", "Search Elements...");
    searchInput.classList.add("search-bar");
    searchInput.style.backgroundColor = '#012840';
    searchInput.style.color = '#00ffcc';
    searchInput.style.border = '2px solid #00ffcc';
    searchInput.style.padding = '10px';
    searchInput.style.marginTop = '10px';
    searchInput.style.width = '80%';
    searchInput.style.fontFamily = 'monospace';
    searchInput.style.fontSize = '16px';
    searchInput.style.borderRadius = '5px';
    document.body.appendChild(searchInput);

    const categoryContainer = document.createElement("div");
    const categories = [
        { value: "all", label: "All" },
        { value: "alkali-metals", label: "Alkali Metals" },
        { value: "alkaline-earth-metals", label: "Alkaline Earth Metals" },
        { value: "transition-metals", label: "Transition Metals" },
        { value: "metalloids", label: "Metalloids" },
        { value: "nonmetals", label: "Nonmetals" },
        { value: "halogens", label: "Halogens" },
        { value: "noble-gases", label: "Noble Gases" },
        { value: "lanthanides", label: "Lanthanides" },
        { value: "actinides", label: "Actinides" }
    ];
    categories.forEach(cat => {
        const btn = document.createElement("button");
        btn.textContent = cat.label;
        btn.classList.add("category-button");
        btn.style.backgroundColor = "#012840";
        btn.style.color = "#00ffcc";
        btn.style.border = "2px solid #00ffcc";
        btn.style.padding = "8px 12px";
        btn.style.margin = "5px 0";
        btn.style.borderRadius = "5px";
        btn.style.cursor = "pointer";
        btn.style.fontFamily = "monospace";
        btn.style.transition = "all 0.3s ease-in-out";
        btn.addEventListener("mouseover", () => {
            btn.style.backgroundColor = "#00ffcc";
            btn.style.color = "black";
        });
        btn.addEventListener("mouseout", () => {
            btn.style.backgroundColor = "#012840";
            btn.style.color = "#00ffcc";
        });
        btn.addEventListener("click", () => generateTable(searchInput.value, cat.value));
        categoryContainer.appendChild(btn);
    });
    categoryContainer.style.display = "flex";
    categoryContainer.style.flexDirection = "column";
    categoryContainer.style.marginRight = "20px";
    categoryContainer.style.padding = "10px";
    categoryContainer.style.border = "2px solid #00ffcc";
    categoryContainer.style.borderRadius = "5px";
    categoryContainer.style.backgroundColor = "#012840";
    categoryContainer.classList.add("category-container");
    const container = document.createElement("div");
    container.style.display = "flex";
    container.style.alignItems = "flex-start";
    document.body.insertBefore(container, searchInput);
    container.appendChild(categoryContainer);
    container.appendChild(periodicTable);

    function showElementDetails(element) {
        const overlay = document.createElement("div");
        overlay.classList.add("overlay");
        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
        overlay.style.display = "flex";
        overlay.style.alignItems = "center";
        overlay.style.justifyContent = "center";
        overlay.style.zIndex = "1000";
        
        const detailsPanel = document.createElement("div");
        detailsPanel.classList.add("details-panel");
        detailsPanel.style.backgroundColor = "#012840";
        detailsPanel.style.color = "#00ffcc";
        detailsPanel.style.padding = "20px";
        detailsPanel.style.border = "2px solid #00ffcc";
        detailsPanel.style.borderRadius = "5px";
        detailsPanel.style.textAlign = "center";
        detailsPanel.style.boxShadow = "0px 0px 10px rgba(0, 255, 204, 0.7)";
        detailsPanel.style.animation = "fadeIn 0.3s ease-in-out";
        
        detailsPanel.innerHTML = `
            <h2>${element.name} (${element.symbol})</h2>
            <p>Atomic Number: ${element.number}</p>
            <p>Atomic Weight: ${element.weight || 'Unknown'}</p>
            <p>Density: ${element.density || 'Unknown'} g/cm³</p>
            <p>Electron Configuration: ${element.electronConfiguration || 'Unknown'}</p>
            <button id="close-details" style="
                background-color: #012840;
                color: #00ffcc;
                border: 2px solid #00ffcc;
                padding: 8px 12px;
                margin-top: 10px;
                border-radius: 5px;
                cursor: pointer;
                font-family: monospace;
                font-size: 14px;
                transition: all 0.3s ease-in-out;
            "
            onmouseover="this.style.backgroundColor='#00ffcc'; this.style.color='black';"
            onmouseout="this.style.backgroundColor='#012840'; this.style.color='#00ffcc';"
            >Close</button>
        `;
        
        overlay.appendChild(detailsPanel);
        document.body.appendChild(overlay);
        
        document.getElementById("close-details").addEventListener("click", () => {
            document.body.removeChild(overlay);
        });
    }

    function generateTable(filter = "", category = "all") {
        periodicTable.innerHTML = "";
        elementsData.filter(element => 
            (category === "all" || element.category === category) &&
            (element.name.toLowerCase().includes(filter.toLowerCase()) ||
            element.symbol.toLowerCase().includes(filter.toLowerCase()) ||
            element.number.toString().includes(filter))
        ).forEach(element => {
            const elementDiv = document.createElement("div");
            elementDiv.classList.add("element", element.category);
            elementDiv.innerHTML = `
                <span class="symbol">${element.symbol}</span>
                <span class="number">${element.number}</span>
            `;
            elementDiv.setAttribute("title", `${element.name} (${element.symbol})`);
            elementDiv.addEventListener("click", () => showElementDetails(element));
            periodicTable.appendChild(elementDiv);
        });
    }

    searchInput.addEventListener("input", (e) => {
        generateTable(e.target.value);
    });

    const script = document.createElement("script");
    script.src = "elements_data.js";
    script.onload = () => {
        console.log("Element data loaded successfully.");
        generateTable();
    };
    document.head.appendChild(script);
    generateTable();
});
