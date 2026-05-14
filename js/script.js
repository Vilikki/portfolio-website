/* typing animation */
var typed = new Typed(".typing", {
    strings: ["Full Stack Developer", "Backend Developer", "Frontend Developer", "Design Assistant", "Massage therapist"],
    typeSpeed:80,
    BackSpeed:60,
    loop:true
})


/* change nav item color on click */
const navLinks = document.querySelectorAll(".aside .nav li a");

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        navLinks.forEach(l => l.classList.remove("active"));
        link.classList.add("active");
    });
})

/* change menu color on scroll */
const sections = document.querySelectorAll(".section");
//const navLinks = document.querySelectorAll(".aside .nav li a");

window.addEventListener("scroll", () => {
    let currentId = "";

    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 500 && rect.bottom > 100) {
            currentId = section.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        const href = link.getAttribute("href");
        if (href === "#" + currentId) {
            link.classList.add("active");
        }
    });
})

/*  Dynamic project loading */
async function loadProject(projectName) {
    const contentArea = document.getElementById('content-area');
    const displaySection = document.getElementById('project-display');

    try {
        console.log(projectName)
        const response = await fetch(`./projects/${projectName}.html`);
        const html = await response.text();

        contentArea.innerHTML = html;

        displaySection.scrollIntoView({behavior: 'smooth'});
    } catch (error) {
        console.log('Error loading project: ',error);
        contentArea.innerHTML = "<p>There was a problem loading the selected project.</p>";
    }
    
}