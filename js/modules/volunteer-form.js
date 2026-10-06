import { saveVolunteer } from "./storage.js";
import {
  clearError,
  formatCep,
  formatCpf,
  formatPhone,
  validateVolunteerForm,
} from "./validation.js";
import { successTemplate } from "../templates/volunteer.js";

function readVolunteer(form) {
  const data = new FormData(form);

  return {
    nome: String(data.get("nome")).trim(),
    email: String(data.get("email")).trim(),
    cpf: String(data.get("cpf")),
    telefone: String(data.get("telefone")),
    cep: String(data.get("cep")),
    disponibilidade: String(data.get("disponibilidade")),
    contribuicao: data.getAll("contribuicao").map(String),
    motivacao: String(data.get("motivacao")).trim(),
    consentimento: data.get("consentimento") === "on",
    criadoEm: new Date().toISOString(),
  };
}

export function bindVolunteerForm(container) {
  const form = container.querySelector("#volunteer-form");

  if (!form) {
    return;
  }

  const status = form.querySelector("#form-status");
  const masks = new Map([
    ["cpf", formatCpf],
    ["telefone", formatPhone],
    ["cep", formatCep],
  ]);

  form.addEventListener("input", (event) => {
    const input = event.target;
    if (!(input instanceof HTMLInputElement || input instanceof HTMLSelectElement
      || input instanceof HTMLTextAreaElement)) {
      return;
    }

    const mask = masks.get(input.name);
    if (mask && input instanceof HTMLInputElement) {
      const containsNonNumericOnly = input.name === "cep"
        && input.value.length > 0
        && !/\d/.test(input.value);
      input.setCustomValidity(
        containsNonNumericOnly ? "Informe o CEP usando números." : ""
      );
      input.value = mask(input.value);
    }

    if (input.name === "contribuicao") {
      const group = form.querySelector("#contribuicao-group");
      group.removeAttribute("aria-invalid");
      group.querySelector("#contribuicao-error").textContent = "";
    } else {
      clearError(input);
    }

    status.textContent = "";
    status.classList.remove("is-error");
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    status.textContent = "";
    status.classList.remove("is-error");

    const firstInvalid = validateVolunteerForm(form);
    if (firstInvalid) {
      status.textContent = "Revise os campos destacados para continuar.";
      status.classList.add("is-error");
      firstInvalid.focus();
      return;
    }

    try {
      const volunteer = readVolunteer(form);
      saveVolunteer(volunteer);

      const section = form.closest(".form-section");
      section.innerHTML = successTemplate(volunteer.nome);
      section.querySelector(".form-success").focus();
    } catch (error) {
      status.textContent = error instanceof Error
        ? `Não foi possível salvar o cadastro: ${error.message}`
        : "Não foi possível salvar o cadastro neste navegador.";
      status.classList.add("is-error");
    }
  });
}
