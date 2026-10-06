import { bindVolunteerForm } from "./modules/volunteer-form.js";
import { homeTemplate, projectsTemplate, volunteerTemplate } from "./templates.js";

const routes = {
  inicio: {
    title: "ONG Esperança | Cuidado que transforma",
    description: "Conheça a ONG Esperança e participe de iniciativas que transformam a comunidade.",
    render: homeTemplate,
  },
  projetos: {
    title: "Nossos projetos | ONG Esperança",
    description: "Conheça as iniciativas solidárias da ONG Esperança e descubra como participar.",
    render: projectsTemplate,
  },
  cadastro: {
    title: "Seja voluntário | ONG Esperança",
    description: "Cadastre-se para colaborar como voluntário com a ONG Esperança.",
    render: volunteerTemplate,
  },
};

const main = document.getElementById("conteudo");
const description = document.querySelector('meta[name="description"]');

function currentRoute() {
  const routeName = window.location.hash.slice(1).replace(/^\/+/, "") || "inicio";

  if (!Object.hasOwn(routes, routeName)) {
    window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}#/inicio`);
    return "inicio";
  }

  return routeName;
}

function renderRoute() {
  const routeName = currentRoute();
  const route = routes[routeName];

  main.innerHTML = route.render;
  document.title = route.title;
  description.content = route.description;

  document.querySelectorAll("[data-route]").forEach((link) => {
    const isCurrent = link.dataset.route === routeName;
    link.classList.toggle("active", isCurrent);

    if (isCurrent) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });

  bindVolunteerForm(main);
  document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });

  window.scrollTo(0, 0);
  main.focus({ preventScroll: true });
}

window.addEventListener("hashchange", renderRoute);
renderRoute();

if ("serviceWorker" in navigator && window.isSecureContext) {
  navigator.serviceWorker.register("./service-worker.js")
    .catch((error) => {
      console.error("Não foi possível ativar o suporte offline.", error);
    });
}
