import { API_BASE_URL } from "../utils/apiConfig.mjs";

const mainContainer = document.getElementById("main-container");

async function listingDetails() {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("id");

        if (!id) {
            throw new Error("No ID found in the URL.");
        }
        const response = await fetch(`${API_BASE_URL}/auction/listings/?_seller=true&_bids=true`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const { data } = await response.json();
        const listing = data.find((item) => item.id === id);
        if (!listing) {
            throw new Error("No listing found with the given ID.");
        }
        renderListingDetails(listing);
    } catch (error) {
        console.error("Error fetching or rendering auction listings:", error);
    }
}

function renderListingDetails(listing) {
    const listingDetailContainer = document.createElement("div");
    listingDetailContainer.classList.add("lg:flex", "flex-row", "justify-center", "items-center");
    const listingDetail = document.createElement("div");
    listingDetail.classList.add("lg:flex", "flex-row", "gap-10", "items-center");
    const listingDetailImgContainer = document.createElement("div");
    listingDetailImgContainer.classList.add("px-6", "flex", "flex-col", "items-center", "justify-center", "pt-9");
    listingDetail.appendChild(listingDetailImgContainer);
    const listingImg = document.createElement("img");
    listingImg.style.maxWidth = "24rem";
    listingImg.classList.add("block", "w-full", "max-w-md", "h-auto", "rounded-lg");
    listingImg.src = listing.media[0].url || "/images/placeholder-image.png";
    listingImg.alt = listing.media[0].alt || "placeholder image";
    listingDetailImgContainer.appendChild(listingImg);
    const listingContent = document.createElement("div");
    listingContent.classList.add("flex", "flex-col", "items-center", "lg:items-start");
    const listingTitle = document.createElement("h1");
    listingTitle.classList.add("font-bold", "font-roboto", "text-3xl", "pt-9");
    listingTitle.innerText = `${listing.title}`;
    const listingDescription = document.createElement("p");
    listingDescription.classList.add("font-open-sans", "py-4");
    listingDescription.style.maxWidth = "25rem";
    listingDescription.innerText = `${listing.description}`.charAt(0).toUpperCase() + `${listing.description}`.slice(1);;
    const listingUsername = document.createElement("p");
    listingUsername.classList.add("font-open-sans", "pb-12");
    listingUsername.innerText = `Seller: ${listing.seller.name}`;
    const bidContainer = document.createElement("div");
    bidContainer.classList.add("lg:flex", "flex-col", "items-start");
    const bidDate = document.createElement("p");
    bidDate.classList.add("font-open-sans", "font-bold", "pb-3");
    const originalDate = listing.created;
    const date = new Date(originalDate);
    const formattedDate = date.toLocaleDateString("en-GB");
    const originalBidDate = formattedDate;
    bidDate.innerText = `${originalBidDate}`;
    const currentBid = document.createElement("p");
    currentBid.classList.add("font-open-sans", "pb-6", "font-bold");
    currentBid.innerText = `Current bid: $${listing.bids[0].amount}`

    listingDetailContainer.appendChild(listingDetail);
    listingDetailContainer.appendChild(listingContent);

    listingContent.appendChild(listingTitle);
    listingContent.appendChild(listingDescription);
    listingContent.appendChild(listingUsername);
    listingContent.appendChild(bidContainer);
    listingContent.appendChild(currentBid);
    mainContainer.appendChild(listingDetailContainer)


    //     <!-- Listing Bid-->
    //         <p class="font-open-sans pb-6">Current bid: <span class="font-bold">$50</span></p>
    //         <form class="flex items-start">
    //             <div class="flex flex-col gap-5 items-center">
    //                 <label class="sr-only" for="bid-amount"></label>
    //                 <input class="pl-3 border border-black h-9 w-44" type="text" name="bid-amount"
    //                     id="bid-amount" required>
    //                 <label class="sr-only" for="bid"></label>
    //                 <input class="bg-slate-blue text-white font-bold h-9 w-44 font-open-sans" type="submit"
    //                     value="Bid" name="bid">
    //             </div>
    //         </form>
    //     </div>
    // </div>
}

listingDetails();