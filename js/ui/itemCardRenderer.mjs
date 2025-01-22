export function listingCard(item, container) {
  const listingCard = document.createElement("a");
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
  listingTitle.classList.add("list-title", "font-bold", "text-xl", "font-roboto", "w-full", "truncate", "text-ellipsis");
  listingTitle.innerText = item.title || "Untitled Listing";
  listingContainer.appendChild(listingTitle);

  // Add creation date
  const listingDateContainer = document.createElement("p");
  listingDateContainer.classList.add("font-open-sans");
  const originalDate = item.created;
  const date = new Date(originalDate);
  const formattedDate = date.toLocaleDateString("en-GB");
  const listingDate = formattedDate;
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
  listingCard.href = `/listing-details/?id=${item.id}`;
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
    "justify-center",
    "rounded-2xl",
  );
  listingButton.innerText = "View";
  listingContainer.appendChild(listingButton);
  listingCard.appendChild(listingContainer);

  if (window.location.pathname === "/profile/" || window.location.pathname === "/profile/index.html") {
    container.appendChild(listingCard);
  };
};