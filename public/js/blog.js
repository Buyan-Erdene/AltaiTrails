document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch("/api/blogs"); // Fetch data from server
        const blogs = await response.json();

        const blogContainer = document.getElementById("blog-container");

        let categories = {}; // Organize blogs by category

        blogs.forEach(blog => {
            if (!categories[blog.category]) {
                categories[blog.category] = [];
            }
            categories[blog.category].push(blog);
        });

        // Generate HTML for each category
        for (let category in categories) {
            let section = document.createElement("section");
            section.classList.add("blog-category");
            section.innerHTML = `<h2>${category}</h2><section class="blogs"></section>`;

            let blogsSection = section.querySelector(".blogs");

            categories[category].forEach(blog => {
                let blogCard = document.createElement("a");
                blogCard.href = `/blog/${blog.id}`;
                blogCard.classList.add("blog-card");
                blogCard.innerHTML = `
                    <img src="${blog.image}" alt="Blog Image" class="blog-img">
                    <p>${blog.title}</p>
                `;
            
                blogsSection.appendChild(blogCard);
            });

            blogContainer.appendChild(section);
        }
    } catch (error) {
        console.error("Error fetching blogs:", error);
    }
});
