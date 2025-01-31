# VaultBid-SP2
For my Semester Project 2, I was tasked with creating and developing a fully functional website. I began by planning the project using GitHub Projects, setting up both a Gantt chart for timeline management and a Kanban board for task tracking. This helped me organize and prioritize tasks effectively throughout the development process.

Next, I designed a high-fidelity prototype of the website, ensuring it was responsive and accessible across both desktop and mobile platforms. I also created a universal style guide to maintain consistency in design elements such as typography, colors, and spacing.

For the development phase, I structured the project using Tailwind CSS to streamline styling and ensure a responsive layout. The functionality was implemented using vanilla JavaScript, ensuring the website met all user stories and provided a seamless user experience.

## The Brief
An auction site is looking to launch a website where users can add items to be bid on and bid on items other users have put up for auction.

When a new user joins the website, they are given 1000 credits to use on the site. They can get credits by selling items and use credit by buying items. Non-registered users can search through the listings, but only registered users can make bids on listings.

### User stories:
The client has specified the following requirements in the form of User Stories:

- A user with a stud.noroff.no email may register.
- A registered user may login.
- A registered user may logout.
- A registered user may update their avatar.
- A registered user may view their total credit.
- A registered user may create a Listing with a title, deadline date, media gallery and description.
- A registered user may add a Bid to another user’s Listing.
- A registered user may view Bids made on a Listing.
- An unregistered user may search through Listings.

## Get Started
Step 1: Clone the Repository
Open your terminal or command prompt.

Clone the repository to your local machine:

```
git clone https://github.com/ephraimdjeket/VaultBid-SP2.git
```
Navigate to the project directory:
```
cd VaultBid-SP2
```

Step 2: Install Dependencies

Install the project dependencies using npm:
```
npm install
```
This will install the required packages listed in package.json, including Tailwind CSS, PostCSS, and Autoprefixer.

Step 3: Configure Tailwind CSS
```
The project uses Tailwind CSS for styling. The configuration file (tailwind.config.js) is already set up.
The main CSS file is located at ./css/main.css. Tailwind processes this file and outputs the compiled styles to ./css/styles.css.
```

Step 4: Build for Production
To view the final output of the project, build the optimized CSS file by running:
```
npm run build
```
This will minify the CSS and output it to ./css/styles.css.

## Built with
This project was built with:
- Tailwind.
- Vanilla Javascript.

## Resources 

<table>
    <tr>
    <td>Gantt Chart</td>
    <td><a href="https://github.com/users/ephraimdjeket/projects/2/views/2?layout=roadmap" target="_blank">My Gantt Chart</a></td>
  </tr>
      <tr>
    <td>Style Guide</td>
    <td><a href="https://www.figma.com/design/7fSE8E0RFCGwlyZlgAdoml/VaultBid-SP2?node-id=186-143" target="_blank">Design guide</a></td>
  </tr>
      <tr>
    <td>Design Prototype</td>
    <td><a href="https://www.figma.com/design/7fSE8E0RFCGwlyZlgAdoml/VaultBid-SP2?node-id=0-1" target="_blank">Desktop</a> - <a href="https://www.figma.com/design/7fSE8E0RFCGwlyZlgAdoml/VaultBid-SP2?node-id=186-142 " target="_blank">Mobile</a></td>
  </tr>
      <tr>
    <td>Kanban Board</td>
    <td><a href="https://github.com/users/ephraimdjeket/projects/2/views/1" target="_blank">My Kanban</a></td>
  </tr>
        <tr>
    <td>Repository</td>
    <td>https://github.com/ephraimdjeket/VaultBid-SP2</td>
  </tr>
      <tr>
    <td>Hosted Demo</td>
    <td>https://coruscating-horse-1cb74a.netlify.app/</td>
  </tr>
</table>
https://docs.noroff.dev/docs/v2/auction-house/profiles
