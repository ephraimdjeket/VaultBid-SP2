import { API_BASE_URL } from "../utils/apiConfig.mjs";

const listingContainer = document.getElementById("listing-container");

async function auctionListings() {
    try {
        const response = await fetch(`${API_BASE_URL}/auction/listings`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        data.forEach(dataType => {
            // The listing card
            const listingCard = document.createElement("div");
            listingCard.classList.add("bg-white rounded-xl w-64 mt-16 flex flex-col justify-center items-left");

            //Listing card img
            const listingCardImg = document.createElement("img");
            listingCardImg.classList.add("rounded-t-xl block w-full");
            listingCardImg.src = dataType.media && dataType.media[0].length > 0 ? `${dataType.media[0].url}` : "/images/placeholder-image.png";
            listingCardImg.alt = dataType.media && dataType.media[0].length > 0 ? `${dataType.media[0].url}` : "placeholder-image";
            listingCard.appendChild(listingCardImg);

            //Listing title
            const listingTitle = document.createElement("h2");
            listingTitle.classList.add("list-title font-bold text-xl font-roboto");
            listingTitle.innerText = `${dataType.title}`;
            listingCard.appendChild(listingTitle);

            //Listing date
            const listingDateContainer = document.createElement("p");
            const listingDate = document.createElement("span");
            listingDateContainer.classList.add("font-open-sans");
            listingDate.classList.add("list-date font-bold");
            listingDate.innerText = `${dataType.created}`;
            listingDateContainer.appendChild(listingDate);
            listingCard.appendChild(listingDateContainer);

            //Listing bid
            const listingBidContainer = document.createElement("p");
            const listingBids = document.createElement("span");
            listingBidContainer.classList.add("font-open-sans");
            listingBids.classList.add("font-bold");
            listingBids.innerText = `${dataType.bids}`
            listingBidContainer.appendChild(listingBids);
            listingCard.appendChild(listingBidContainer);

            // Listing button
            const listingButton = document.createElement("a");
            listingButton.href = `/listing-details/`
            listingButton.classList.add("list-button bg-slate-blue font-bold font-open-sans w-40 h-9 mt-5 text-white flex items-center justify-center");
            listingButton.innerText = "View"
            listingCard.appendChild(listingButton)
            console.log(listingCard)
            listingContainer.appendChild(listingCard);
        })
    } catch (error) {

    }
}

auctionListings();