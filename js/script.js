/* typing animation */
var typed = new Typed(".typing", {
    strings: ["Full Stack Developer", "Design Assistant", "Massage therapist"],
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

const closeBtn = document.querySelector('.close');
const modal = document.getElementById('image-modal');
let currentImages = [];
let currentIndex = 0;

document.getElementById('content-area').addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG') {
        const gallery = e.target.closest('.project-gallery');
        
        currentImages = Array.from(gallery.querySelectorAll('img'));
        currentIndex = currentImages.indexOf(e.target);
        
        showImage();
    }
});

document.querySelector('.next').onclick = () => {
    currentIndex = (currentIndex + 1) % currentImages.length; // Loop to start
    showImage();
};

document.querySelector('.prev').onclick = () => {
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length; // Loop to end
    showImage();
};


closeBtn.onclick = () => modal.style.display = "none";

window.onclick = (e) => {
    if (e.target == modal) {
        modal.style.display = "none";
    }
}

document.querySelector('.close').onclick = () => {
        modal.style.display = "none";
}

document.onkeydown = function(e) {
    if (document.getElementById('image-modal').style.display === "flex") {
        if (e.key === "ArrowLeft") document.querySelector('.prev').click();
        if (e.key === "ArrowRight") document.querySelector('.next').click();
        if (e.key === "Escape") document.querySelector('.close').click();
    }
};

function showImage() {
        const modal = document.getElementById('image-modal');
        const modalImg = document.getElementById('full-image');
        const captionText = document.getElementById('caption');    
        
        modal.style.display = "flex";
        modalImg.src = currentImages[currentIndex].src;
    
        captionText.innerHTML = currentImages[currentIndex].alt || "Project screenshot";
}


