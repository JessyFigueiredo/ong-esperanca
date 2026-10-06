const routes = {
  inicio: {
    title: "ONG Esperança | Cuidado que transforma",
    description: "Conheça a ONG Esperança e participe de iniciativas que transformam a comunidade.",
    render: async () => main.innerHTML,
  },
  projetos: {
    title: "Nossos projetos | ONG Esperança",
    description: "Conheça as iniciativas solidárias da ONG Esperança e descubra como participar.",
    render: async () => (await import("./templates/projects.js")).projectsTemplate,
  },
  cadastro: {
    title: "Seja voluntário | ONG Esperança",
    description: "Cadastre-se para colaborar como voluntário com a ONG Esperança.",
    render: async () => (await import("./templates/volunteer.js")).volunteerTemplate,
  },
};

const main = document.getElementById("conteudo");
const description = document.querySelector('meta[name="description"]');
const routeContent = new Map([["inicio", main.innerHTML]]);
let renderSequence = 0;

function currentRoute() {
  const routeName = window.location.hash.slice(1).replace(/^\/+/, "") || "inicio";

  if (!Object.hasOwn(routes, routeName)) {
    window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}#/inicio`);
    return "inicio";
  }

  return routeName;
}

function setHeroImagePreload(routeName) {
  const preloadId = "hero-image-preload";
  const existingPreload = document.getElementById(preloadId);

  if (routeName !== "inicio") {
    existingPreload?.remove();
    return;
  }

  if (existingPreload) {
    return;
  }

  const preload = document.createElement("link");
  preload.id = preloadId;
  preload.rel = "preload";
  preload.as = "image";
  preload.href = "imagens/Img1-768.webp";
  preload.imageSrcset = "imagens/Img1-400.webp 400w, imagens/Img1-768.webp 768w, imagens/Img1.webp 1536w";
  preload.imageSizes = "(max-width: 768px) calc(100vw - 30px), (max-width: 1200px) 50vw, 550px";
  preload.fetchPriority = "high";
  document.head.append(preload);
}

async function renderRoute(shouldFocusMain = true) {
  const sequence = ++renderSequence;
  const routeName = currentRoute();
  const route = routes[routeName];

  setHeroImagePreload(routeName);
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

  try {
    const content = routeContent.has(routeName)
      ? routeContent.get(routeName)
      : await route.render();
    if (sequence !== renderSequence) {
      return;
    }

    routeContent.set(routeName, content);
    if (main.innerHTML !== content) {
      main.innerHTML = content;
    }

    if (routeName === "cadastro") {
      const { bindVolunteerForm } = await import("./modules/volunteer-form.js");
      if (sequence !== renderSequence) {
        return;
      }
      bindVolunteerForm(main);
    }
  } catch (error) {
    console.error(`Não foi possível carregar a página "${routeName}".`, error);
    if (sequence === renderSequence) {
      main.innerHTML = "<p role=\"alert\">Não foi possível carregar esta página. Tente novamente.</p>";
    }
    return;
  }

  document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });

  window.scrollTo(0, 0);
  if (shouldFocusMain) {
    main.focus({ preventScroll: true });
  }
}

window.addEventListener("hashchange", () => renderRoute());
renderRoute(false);

if ("serviceWorker" in navigator && window.isSecureContext) {
  navigator.serviceWorker.register("./service-worker.js")
    .catch((error) => {
      console.error("Não foi possível ativar o suporte offline.", error);
    });
}
