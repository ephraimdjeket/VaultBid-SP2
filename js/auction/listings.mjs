import { API_BASE_URL } from "../utils/apiConfig.mjs";

const listingCardContainer = document.getElementById("listing-container");

async function auctionListings() {
    if (!listingCardContainer) {
        console.error("Listing container element not found.");
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/auction/listings`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const { data } = await response.json();
        console.log("API Response Data:", data);

        data.forEach((item) => {
            console.log("Rendering Listing:", item);
            const listingCard = document.createElement("div");
            listingCard.classList.add(
                "bg-white",
                "rounded-xl",
                "w-64",
                "mt-16",
                "flex",
                "flex-col",
                "justify-center",
                "items-left",
            );
            console.log(item.media);

            // Add image
            const mediaUrl = item.media && item.media.length > 0 ? item.media[0].url : "/images/placeholder-image.png";
            const listingCardImg = document.createElement("img");
            listingCardImg.style.height = "12rem";
            listingCardImg.classList.add("rounded-t-xl", "block", "w-full", "object-cover");
            listingCardImg.src = mediaUrl;
            listingCardImg.alt = item.media && item.media.length > 0 ? item.media[0].alt : "Placeholder Image";
            listingCard.appendChild(listingCardImg);

            // Add card information container
            const listingContainer = document.createElement("div");
            listingContainer.classList.add("pl-7",
                "py-9");

            // Add title
            const listingTitle = document.createElement("h2");
            listingTitle.classList.add("list-title", "font-bold", "text-xl", "font-roboto", "w-full", "truncate");
            listingTitle.innerText = item.title && item.title.length > 12
                ? item.title.substring(0, 12) + "..."
                : item.title || "Untitled Listing";
            listingContainer.appendChild(listingTitle);

            // Add creation date
            const listingDateContainer = document.createElement("p");
            listingDateContainer.classList.add("font-open-sans");
            const listingDate = null;
            listingDateContainer.innerText = `Created: ${listingDate}`;
            listingContainer.appendChild(listingDateContainer);

            // Add bid count
            const listingBidContainer = document.createElement("p");
            listingBidContainer.classList.add("font-open-sans");
            const bidCount = item._count?.bids || 0;
            listingBidContainer.innerText = `Bids: ${bidCount}`;
            listingContainer.appendChild(listingBidContainer);

            // Add view button
            const listingButton = document.createElement("a");
            listingButton.href = `/listing-details/${item.id}`;
            listingButton.classList.add(
                "list-button",
                "bg-slate-blue",
                "font-bold",
                "font-open-sans",
                "w-40",
                "h-9",
                "mt-5",
                "text-white",
                "flex",
                "items-center",
                "justify-center"
            );
            listingButton.innerText = "View";
            listingContainer.appendChild(listingButton);
            listingCard.appendChild(listingContainer);

            // Append card to container
            listingCardContainer.appendChild(listingCard);
        });
    } catch (error) {
        console.error("Error fetching or rendering auction listings:", error);
    }
}

auctionListings();
