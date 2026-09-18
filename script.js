const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");
const navbar = document.getElementById("navbar");
const langButtons = document.querySelectorAll(".lang-btn");

if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });
}

const sections = [...document.querySelectorAll("section[id]")];
const navLinks = [...document.querySelectorAll(".nav-link")];
let manualNavId = null;
let manualNavTimer = null;

function setActiveNav(link) {
    navLinks.forEach(item => {
        item.classList.toggle("active", item === link);
    });
}

function clearManualNav() {
    manualNavId = null;
    if (manualNavTimer) {
        clearTimeout(manualNavTimer);
        manualNavTimer = null;
    }
}

function updateActiveNavFromScroll() {
    if (manualNavId) return;

    let currentId = "home";
    let smallestDistance = Infinity;

    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const distance = Math.abs(rect.top - 160);

        if (rect.top <= 200 && rect.bottom >= 200) {
            currentId = section.id;
            return;
        }

        if (distance < smallestDistance) {
            smallestDistance = distance;
            currentId = section.id;
        }
    });

    const activeLink = document.querySelector(`.nav-link[href="#${currentId}"]`);
    if (activeLink) setActiveNav(activeLink);
}

document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", (event) => {
        event.preventDefault();

        const id = link.getAttribute("href");
        manualNavId = id ? id.slice(1) : "home";
        if (manualNavTimer) clearTimeout(manualNavTimer);
        manualNavTimer = setTimeout(() => {
            clearManualNav();
        }, 1200);

        setActiveNav(link);

        const target = id ? document.querySelector(id) : null;
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        if (navMenu) navMenu.classList.remove("active");
        if (hamburger) hamburger.classList.remove("active");
    });
});

window.addEventListener("scroll", () => {
    if (navbar) {
        navbar.classList.toggle("scrolled", window.scrollY > 50);
    }
    updateActiveNavFromScroll();
});

window.addEventListener("load", () => {
    updateActiveNavFromScroll();
});

const sectionObserver = new IntersectionObserver((entries) => {
    if (manualNavId) return;

    const visibleEntries = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

    if (visibleEntries.length > 0) {
        const section = visibleEntries[0].target;
        const activeLink = document.querySelector(`.nav-link[href="#${section.id}"]`);
        if (activeLink) setActiveNav(activeLink);
    }
}, {
    threshold: [0.2, 0.5, 0.8],
    rootMargin: '-10% 0px -35% 0px'
});

sections.forEach(section => sectionObserver.observe(section));

const magneticItems = document.querySelectorAll(".nav-link");

magneticItems.forEach(item => {
    item.addEventListener("mousemove", e => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        item.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });

    item.addEventListener("mouseleave", () => {
        item.style.transform = "translate(0,0)";
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    if (anchor.classList.contains('nav-link')) return;

    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

const translations = {
    id: {
        'nav.home': 'Home',
        'nav.about': 'Tentang',
        'nav.projects': 'Proyek',
        'nav.certificates': 'Sertifikat',
        'nav.contact': 'Kontak',
        'home.intro': 'Halo, Saya',
        'home.role1': 'Mahasiswa Universitas Sumatera Utara',
        'home.role2': 'Mahasiswa Teknologi Informasi',
        'home.role3': 'Fakultas Ilmu Komputer - Teknologi Informasi',
        'home.desc': 'Mahasiswa semester 3 di Universitas Sumatera Utara, jurusan Teknologi Informasi. Saya memiliki minat yang besar dalam pengembangan web dan desain UI/UX. Saya berkomitmen untuk terus belajar dan mengembangkan keterampilan saya dalam menciptakan pengalaman.',
        'home.viewProjects': 'Lihat Proyek',
        'home.contactMe': 'Hubungi Saya',
        'about.subtitle': 'Kenali Saya',
        'about.title': 'Tentang Saya',
        'about.cardExperience': 'Pengalaman',
        'about.cardExperienceText': 'Semester 3<br><span>Mahasiswa Aktif</span>',
        'about.cardProject': 'Proyek',
        'about.cardProjectText': '5+ Selesai<br><span>Web &amp; UI Projects</span>',
        'about.cardEducation': 'Pendidikan',
        'about.cardEducationText': 'Teknologi Informasi<br><span>Pembelajaran diri dan projek</span>',
        'about.text': 'Saya merupakan seorang developer web yang sedang menempuh pendidikan di Universitas Sumatera Utara. Saya memiliki minat yang besar dalam pengembangan web dan desain UI/UX. Saya berkomitmen untuk terus belajar dan mengembangkan keterampilan saya dalam menciptakan pengalaman pengguna yang menarik.',
        'about.explore': 'Jelajahi Proyek',
        'experience.subtitle': 'Yang Bisa Saya Lakukan',
        'experience.title': 'Pengalaman',
        'projects.subtitle': 'Jelajahi Karya Saya',
        'projects.title': 'Proyek Unggulan',
        'certificates.subtitle': 'Jelajahi Sertifikat Saya',
        'certificates.title': 'Sertifikat',
        'contact.subtitle': 'Mari Terhubung',
        'contact.title': 'Hubungi Saya',
        'contact.emailLabel': 'Email',
        'footer.portfolio': 'Portofolio Saya',
        'project.exporeBandung': 'Explore Bandung',
        'project.exporeBandungDesc': 'Website untuk menjelajahi destinasi wisata di Kota Bandung.',
        'project.zurve': 'Zurve - Tenaga Ahli',
        'project.zurveDesc': 'Website untuk mengelola layanan tenaga ahli.',
        'project.designFigma': 'Design-Figma',
        'project.designFigmaDesc': 'Proyek desain Figma untuk website komunitas GDGoC.',
        'project.hosting': 'Website-Hosting',
        'project.hostingDesc': 'Proyek hosting website untuk Komunitas Competition ID.',
        'cert.android': 'Android Mobile Programming',
        'cert.androidDesc': 'Menyelesaikan jalur Android Mobile Programming dan mengembangkan keterampilan aplikasi mobile melalui pembelajaran terarah.',
        'cert.cyberBest': 'Best Project in Cybersecurity',
        'cert.cyberBestDesc': 'Diakui karena menyelesaikan proyek akhir terbaik pada jalur keamanan siber dengan eksekusi teknis yang kuat dan dedikasi.',
        'cert.cyber': 'Cybersecurity Pathway',
        'cert.cyberDesc': 'Mendapatkan sertifikat ini setelah berhasil menyelesaikan jalur pembelajaran dan tahap penilaian keamanan siber.',
        'cert.ml': 'Machine Learning Pathway',
        'cert.mlDesc': 'Menyelesaikan jalur machine learning dengan pemahaman yang kuat tentang konsep AI dasar dan pemecahan masalah nyata.',
        'cert.uiux': 'UI/UX Pathway',
        'cert.uiuxDesc': 'Mengembangkan kemampuan design thinking dan antarmuka yang berfokus pada pengguna melalui jalur pembelajaran UI/UX.',
        'cert.web': 'Web Pathway',
        'cert.webDesc': 'Menyelesaikan jalur pengembangan web dengan mengasah kemampuan front-end dan pembuatan produk digital.',
        'cert.juara': 'Juara II Website Competition',
        'cert.juaraDesc': 'Meraih juara dua dalam kompetisi website ID Community Medan berkat kontribusi kreatif dan hasil kerja yang berdampak.'
    },
    en: {
        'nav.home': 'Home',
        'nav.about': 'About',
        'nav.projects': 'Projects',
        'nav.certificates': 'Certificates',
        'nav.contact': 'Contact',
        'home.intro': 'Hello, I am',
        'home.role1': 'Student of University of North Sumatra',
        'home.role2': 'Information Technology Student',
        'home.role3': 'Faculty of Computer Science - Information Technology',
        'home.desc': 'A 3rd semester student at the University of North Sumatra majoring in Information Technology. I have a strong interest in web development and UI/UX design. I am committed to continuing to learn and improve my skills in creating engaging user experiences.',
        'home.viewProjects': 'View Projects',
        'home.contactMe': 'Contact Me',
        'about.subtitle': 'Get To Know',
        'about.title': 'About Me',
        'about.cardExperience': 'Experience',
        'about.cardExperienceText': 'Semester 3<br><span>Active Student</span>',
        'about.cardProject': 'Project',
        'about.cardProjectText': '5+ Completed<br><span>Web &amp; UI Projects</span>',
        'about.cardEducation': 'Education',
        'about.cardEducationText': 'Information Technology<br><span>Self-learning and projects</span>',
        'about.text': 'I am a web developer currently studying at the University of North Sumatra. I have a strong interest in web development and UI/UX design. I am committed to continuing to learn and develop my skills in creating engaging user experiences.',
        'about.explore': 'Explore Projects',
        'experience.subtitle': 'What I Can Do',
        'experience.title': 'Experience',
        'projects.subtitle': 'Explore My Work',
        'projects.title': 'Featured Projects',
        'certificates.subtitle': 'Explore My Certification',
        'certificates.title': 'Certificates',
        'contact.subtitle': 'Letâ€™s Connect',
        'contact.title': 'Contact Me',
        'contact.emailLabel': 'Email',
        'footer.portfolio': 'My Portfolio',
        'project.exporeBandung': 'Explore Bandung',
        'project.exporeBandungDesc': 'Website to explore tourist destinations in Bandung City.',
        'project.zurve': 'Zurve - Tenaga Ahli',
        'project.zurveDesc': 'Website for managing expert workforce services.',
        'project.designFigma': 'Design-Figma',
        'project.designFigmaDesc': 'Figma design project for the GDGoC community website.',
        'project.hosting': 'Website-Hosting',
        'project.hostingDesc': 'Website hosting project for Competition ID Community.',
        'cert.android': 'Android Mobile Programming',
        'cert.androidDesc': 'Completed the Android Mobile Programming pathway and developed practical mobile app skills through guided learning.',
        'cert.cyberBest': 'Best Project in Cybersecurity',
        'cert.cyberBestDesc': 'Recognized for delivering the best final project in the cybersecurity pathway with strong technical execution and dedication.',
        'cert.cyber': 'Cybersecurity Pathway',
        'cert.cyberDesc': 'Earned this certificate after successfully finishing the cybersecurity learning path and assessment stages.',
        'cert.ml': 'Machine Learning Pathway',
        'cert.mlDesc': 'Completed the machine learning pathway with strong understanding in core AI concepts and practical problem solving.',
        'cert.uiux': 'UI/UX Pathway',
        'cert.uiuxDesc': 'Developed design thinking and user-centered interface skills through the UI/UX learning pathway and project completion.',
        'cert.web': 'Web Pathway',
        'cert.webDesc': 'Finished the web development pathway by building and refining skills in frontend technologies and digital product creation.',
        'cert.juara': 'Juara II Website Competition',
        'cert.juaraDesc': 'Won second place in the ID Community Website Competition for impactful contributions and strong creativity in digital product development.'
    }
};

const defaultLang = 'id';
let currentLang = defaultLang;

function applyTranslations(lang) {
    const nodes = document.querySelectorAll('[data-i18n]');
    nodes.forEach(node => {
        const key = node.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            node.innerHTML = translations[lang][key];
        }
    });
    currentLang = lang;
    if (langButtons) {
        langButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.lang === lang));
    }
}

const savedLang = localStorage.getItem('lang') || 'id';

applyTranslations(savedLang);

if (langButtons) {
    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.dataset.lang;
            localStorage.setItem('lang', lang);
            applyTranslations(lang);
        });
    });
}

const titleElement = document.querySelector('.title');
const titleText = 'Frontend Developer';
let index = 0;

function typeWriter() {
    if (titleElement && index < titleText.length) {
        titleElement.textContent += titleText.charAt(index);
        index++;
        setTimeout(typeWriter, 100);
    }
}

window.addEventListener('load', () => {
    if (titleElement) {
        titleElement.textContent = '';
        setTimeout(typeWriter, 500);
    }
});