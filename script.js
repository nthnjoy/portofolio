const fallbackProjects = [
  {
    name: "UTS-RPL-APPL-11423044",
    html_url: "https://github.com/nthnjoy/UTS-RPL-APPL-11423044",
    description: "Proyek UTS pengembangan aplikasi.",
    language: "Go",
    pushed_at: "2026-03-26T08:02:38Z"
  },
  {
    name: "Winner_Laundry",
    html_url: "https://github.com/nthnjoy/Winner_Laundry",
    description: "Winner Laundry Project.",
    language: "Blade",
    pushed_at: "2026-01-23T17:25:14Z"
  },
  {
    name: "GEMASTIK",
    html_url: "https://github.com/nthnjoy/GEMASTIK",
    description: "Proyek data mining.",
    language: "Jupyter Notebook",
    pushed_at: "2025-09-11T14:11:42Z"
  }
];

const projectList = document.getElementById("project-list");
const lastUpdated = document.getElementById("last-updated");

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatDate(isoDate) {
  const date = new Date(isoDate);
  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}

function renderProjects(repos) {
  projectList.innerHTML = "";

  repos.slice(0, 6).forEach((repo) => {
    const card = document.createElement("article");
    card.className = "project-card";

    const desc = escapeHtml(repo.description || "Repository proyek di GitHub.");
    const lang = escapeHtml(repo.language || "Multi-stack");
    const name = escapeHtml(repo.name);

    card.innerHTML = `
      <h3><a href="${repo.html_url}" target="_blank" rel="noreferrer noopener">${name}</a></h3>
      <p>${desc}</p>
      <div class="project-meta">
        <span>${lang}</span>
        <span>${formatDate(repo.pushed_at)}</span>
      </div>
    `;

    projectList.appendChild(card);
  });
}

async function loadProjects() {
  try {
    const response = await fetch(
      "https://api.github.com/users/nthnjoy/repos?sort=updated&per_page=12"
    );

    if (!response.ok) {
      throw new Error("Unable to fetch repositories");
    }

    const repos = await response.json();
    renderProjects(repos);
  } catch (_error) {
    renderProjects(fallbackProjects);
  }
}

lastUpdated.textContent = `Diperbarui ${new Date().toLocaleDateString("id-ID", {
  day: "2-digit",
  month: "long",
  year: "numeric"
})}`;

loadProjects();
